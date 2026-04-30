/**
 * Build a machine-readable manifest of every component this package exports.
 *
 * Output: <repo>/components.json (also shipped in the published tarball).
 *
 * The manifest is the AI-facing mirror of `rules/`. AI agents and tooling can
 * read it from `node_modules/@kt057/ai-design-system/components.json`
 * to know which components exist, what props they accept, and where to find
 * the per-component rule file.
 */
import { readFileSync, readdirSync, writeFileSync, statSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import ts from "typescript";

const ROOT = resolve(import.meta.dirname, "..");
const COMPONENTS_DIR = join(ROOT, "src/components");
const RULES_DIR = join(ROOT, "rules/components");
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const OUT = join(ROOT, "components.json");

interface PropEntry {
  name: string;
  type: string;
  optional: boolean;
  defaultValue: string | null;
  description: string;
}

interface VariantEntry {
  name: string;
  values: string[];
  defaultValue: string | null;
}

interface ComponentEntry {
  name: string;
  description: string;
  importStatement: string;
  sourcePath: string;
  rulesPath: string | null;
  props: PropEntry[];
  variants: VariantEntry[];
  examples: string[];
}

function listComponentDirs(): string[] {
  return readdirSync(COMPONENTS_DIR).filter((dir) => {
    const full = join(COMPONENTS_DIR, dir);
    return statSync(full).isDirectory();
  });
}

function getJsDocComment(node: ts.Node, source: ts.SourceFile): string {
  const ranges = ts.getLeadingCommentRanges(source.getFullText(), node.getFullStart());
  if (!ranges) return "";
  const docs = ranges
    .filter((r) => r.kind === ts.SyntaxKind.MultiLineCommentTrivia)
    .map((r) => source.getFullText().slice(r.pos, r.end))
    .filter((c) => c.startsWith("/**"));
  if (docs.length === 0) return "";
  const last = docs[docs.length - 1]!;
  return last
    .replace(/^\/\*\*+/, "")
    .replace(/\*+\/$/, "")
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trim();
}

function extractDefault(jsdoc: string): string | null {
  const m = jsdoc.match(/@default\s+(.+)/);
  return m && m[1] ? m[1].trim() : null;
}

function stripJsDocTags(jsdoc: string): string {
  return jsdoc
    .split("\n")
    .filter((line) => !line.trim().startsWith("@"))
    .join("\n")
    .trim();
}

function extractPropsFromInterface(
  node: ts.InterfaceDeclaration,
  source: ts.SourceFile,
  checker: ts.TypeChecker,
): PropEntry[] {
  const props: PropEntry[] = [];
  const seen = new Set<string>();

  const collect = (members: readonly ts.TypeElement[]) => {
    for (const member of members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      const name = member.name.getText(source);
      if (seen.has(name)) continue;
      seen.add(name);
      const jsdoc = getJsDocComment(member, source);
      const typeText = member.type ? member.type.getText(source) : "unknown";
      props.push({
        name,
        type: typeText.replace(/\s+/g, " ").trim(),
        optional: !!member.questionToken,
        defaultValue: extractDefault(jsdoc),
        description: stripJsDocTags(jsdoc),
      });
    }
  };

  collect(node.members);

  if (node.heritageClauses) {
    for (const heritage of node.heritageClauses) {
      for (const expr of heritage.types) {
        const type = checker.getTypeAtLocation(expr);
        for (const symbol of type.getProperties()) {
          if (seen.has(symbol.name)) continue;
          if (symbol.name.startsWith("_")) continue;
          if (isDomNoise(symbol.name)) continue;
          const decl = symbol.declarations?.[0];
          const description = decl
            ? ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim()
            : "";
          // Drop everything that has no JSDoc — those are React's HTMLAttributes
          // surface and add a lot of noise without helping an AI agent decide
          // whether to use the prop.
          if (!description) continue;
          seen.add(symbol.name);
          const t = checker.getTypeOfSymbolAtLocation(symbol, expr);
          props.push({
            name: symbol.name,
            type: checker.typeToString(t).replace(/\s+/g, " ").trim(),
            optional: !!(symbol.flags & ts.SymbolFlags.Optional),
            defaultValue: null,
            description,
          });
        }
      }
    }
  }

  return props;
}

/**
 * Names that come from React's HTMLAttributes / DOMAttributes and add no value
 * to AI consumers. Drop them outright.
 */
function isDomNoise(name: string): boolean {
  return (
    /^on(Mouse|Touch|Pointer|Wheel|Scroll|Animation|Transition|GotPointer|LostPointer|AuxClick|ContextMenu|DoubleClick)/.test(
      name,
    ) ||
    name === "onClickCapture" ||
    name === "dir" ||
    name === "lang" ||
    name === "hidden" ||
    name === "inert" ||
    name === "translate" ||
    name === "style" ||
    name === "render" ||
    name === "slot"
  );
}

function extractVariantsFromCva(source: ts.SourceFile): VariantEntry[] {
  const variants: VariantEntry[] = [];
  let defaultsNode: ts.ObjectLiteralExpression | null = null;
  let variantsNode: ts.ObjectLiteralExpression | null = null;

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "cva"
    ) {
      const cfg = node.arguments[1];
      if (cfg && ts.isObjectLiteralExpression(cfg)) {
        for (const prop of cfg.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const key = prop.name.getText(source);
          if (key === "variants" && ts.isObjectLiteralExpression(prop.initializer)) {
            variantsNode = prop.initializer;
          } else if (key === "defaultVariants" && ts.isObjectLiteralExpression(prop.initializer)) {
            defaultsNode = prop.initializer;
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);

  if (!variantsNode) return variants;

  const defaults: Record<string, string> = {};
  if (defaultsNode) {
    for (const prop of (defaultsNode as ts.ObjectLiteralExpression).properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = prop.name.getText(source);
      const val = prop.initializer.getText(source).replace(/['"]/g, "");
      defaults[key] = val;
    }
  }

  for (const prop of (variantsNode as ts.ObjectLiteralExpression).properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = prop.name.getText(source);
    if (!ts.isObjectLiteralExpression(prop.initializer)) continue;
    const values = prop.initializer.properties
      .filter((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p))
      .map((p) => p.name.getText(source).replace(/['"]/g, ""));
    variants.push({
      name,
      values,
      defaultValue: defaults[name] ?? null,
    });
  }

  return variants;
}

function extractExamplesFromRules(rulesPath: string): string[] {
  if (!existsSync(rulesPath)) return [];
  const md = readFileSync(rulesPath, "utf8");
  const examples: string[] = [];
  const re = /```tsx\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(md)) !== null) {
    if (match[1]) examples.push(match[1].trim());
  }
  return examples.slice(0, 5);
}

function findComponentExport(source: ts.SourceFile): {
  name: string;
  description: string;
  propsInterface: ts.InterfaceDeclaration | null;
} | null {
  let name: string | null = null;
  let description = "";
  let propsInterface: ts.InterfaceDeclaration | null = null;

  ts.forEachChild(source, (node) => {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer) {
          name = decl.name.text;
          description = stripJsDocTags(getJsDocComment(node, source));
        }
      }
    }
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith("Props")) {
      propsInterface = node;
    }
  });

  return name ? { name, description, propsInterface } : null;
}

function buildComponent(dir: string, program: ts.Program): ComponentEntry | null {
  const file = join(COMPONENTS_DIR, dir, `${dir}.tsx`);
  if (!existsSync(file)) return null;

  const source = program.getSourceFile(file);
  if (!source) return null;
  const checker = program.getTypeChecker();

  const found = findComponentExport(source);
  if (!found) return null;

  const props = found.propsInterface
    ? extractPropsFromInterface(found.propsInterface, source, checker)
    : [];
  const variants = extractVariantsFromCva(source);

  const rulesPath = join(RULES_DIR, `${found.name}.md`);
  const hasRules = existsSync(rulesPath);

  return {
    name: found.name,
    description: found.description,
    importStatement: `import { ${found.name} } from "${PKG.name}";`,
    sourcePath: `src/components/${dir}/${dir}.tsx`,
    rulesPath: hasRules ? `rules/components/${found.name}.md` : null,
    props,
    variants,
    examples: extractExamplesFromRules(rulesPath),
  };
}

function main() {
  const dirs = listComponentDirs();
  const files = dirs.map((d) => join(COMPONENTS_DIR, d, `${d}.tsx`)).filter(existsSync);

  const program = ts.createProgram({
    rootNames: files,
    options: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      strict: true,
      skipLibCheck: true,
      esModuleInterop: true,
      isolatedModules: true,
      noEmit: true,
      allowImportingTsExtensions: false,
      baseUrl: ROOT,
      paths: { "@/*": ["src/*"] },
    },
  });

  const components = dirs
    .map((d) => buildComponent(d, program))
    .filter((c): c is ComponentEntry => c !== null);

  const manifest = {
    $schema: "https://json.schemastore.org/component-manifest.json",
    name: PKG.name,
    version: PKG.version,
    description: PKG.description,
    generatedAt: new Date().toISOString(),
    rulesEntry: "rules/README.md",
    stylesEntry: "dist/styles.css",
    components,
  };

  writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✔ wrote ${components.length} components to ${OUT}`);
}

main();
