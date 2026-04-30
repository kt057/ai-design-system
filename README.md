# `@kt057/ai-design-system`

> **React Aria Components** と **Tailwind CSS v4** で構築された、AI フレンドリーな React デザインシステム。

このデザインシステムは意図的に小さく保たれています。すべてのコンポーネントには次の特徴があります。

- **`react-aria-components` によるアクセシビリティ** — キーボード操作、フォーカス管理、スクリーンリーダー対応は実績のあるライブラリに任せています。
- **トークンベースのテーマ** — CSS カスタムプロパティを上書きするだけでブランディングを変更できます。`<ThemeProvider>` は不要です。
- **AI が読めるドキュメント** — 自動生成される [`components.json`](./components.json) マニフェストとコンポーネントごとの [`rules/`](./rules/) により、AI エージェントが任意のプロジェクトで本パッケージを正しく利用できます。

---

## インストール

> **注意**: 本パッケージはまだ npm レジストリに公開されていないため、`npm install @kt057/ai-design-system` は現時点では動作しません。試したい場合は、このリポジトリから tarball をビルドして直接インストールしてください。npm への公開が可能になり次第、このセクションは差し替えられます。詳細は [ロードマップ](#ロードマップ) を参照してください。

### 1. tarball をビルドする（本リポジトリで）

```bash
pnpm install
pnpm pack
# → kt057-ai-design-system-<version>.tgz がリポジトリのルートに生成されます
```

`prepack` フックが自動的に `pnpm run build`（ライブラリ + CSS + マニフェスト）を実行するため、`pnpm pack` だけで完全にビルド済みの tarball が生成されます。

### 2. 利用側プロジェクトにインストールする

```bash
pnpm add /absolute/path/to/kt057-ai-design-system-<version>.tgz
# 例:
# pnpm add /Users/you/works/ai-design-system/kt057-ai-design-system-0.2.0.tgz
```

絶対パスでインストールするため、別のマシンで同じ tarball を使うには `.tgz` ファイルをコピーする必要があります。

### 3. スタイルシートを読み込む

アプリのエントリーポイントで一度だけ読み込みます。

```ts
import "@kt057/ai-design-system/styles.css";
```

このスタイルシートは **自己完結型** で、デザイントークンと、各コンポーネントが実際に使用するすべての Tailwind ユーティリティクラスを含んでコンパイル済みの状態で出荷されます。コンポーネントを正しくレンダリングするために、利用側プロジェクトで Tailwind をインストール・設定する必要は **ありません**。（自分でも Tailwind v4 を使っている場合は、CSS で `@theme` を再宣言すれば、`bg-brand-500` のように本パッケージのトークンを自分のコードから参照することもできます。詳しくは [テーマ](#テーマ) を参照してください。）

Next.js App Router でもシームレスに動作します。すべてのコンポーネントは React Client Component として出荷され（バンドル先頭の `"use client"` が保持されます）、Server Component から `import { Button }` のように直接インポートできます。

## 使い方

```tsx
import { Button } from "@kt057/ai-design-system";

export function SaveBar() {
  return (
    <Button variant="primary" onPress={() => save()}>
      Save
    </Button>
  );
}
```

完全な props の仕様、サンプル、アクセシビリティに関する注意点は、[`rules/components/`](./rules/components/) のコンポーネントごとのルールファイルを参照してください。

## テーマ

スタイルシートをインポートした後、任意のトークンを上書きできます。

```css
@import "@kt057/ai-design-system/styles.css";

:root {
  --color-brand-500: oklch(60% 0.2 30);
  --color-brand-600: oklch(52% 0.2 30);
  --color-brand-700: oklch(44% 0.18 30);
}
```

トークンの完全な一覧は [`rules/01-design-tokens.md`](./rules/01-design-tokens.md) に記載されています。

## AI エージェント向け

本パッケージは AI コーディングアシスタントから利用されることを想定して設計されています。インストール後、エージェントは次のファイルを読み取れます。

- `node_modules/@kt057/ai-design-system/components.json` — 機械可読なコンポーネントマニフェスト（props、バリアント、サンプル、ソースパス）。
- `node_modules/@kt057/ai-design-system/rules/` — コンポーネントごとの仕様と全体の規約を記述した Markdown ファイル群。

推奨されるプロンプトは次のとおりです: _「`@kt057/ai-design-system` のコンポーネントを使ってください。コードを書く前に、`rules/00-overview.md` と、利用予定のコンポーネントの `rules/components/<Name>.md` を必ず読んでください。」_

## コントリビュート

本リポジトリは主に Claude Code を通じて管理されています。規約は [`rules/`](./rules/) に、AI のオーケストレーション関連ファイルは [`.claude/`](./.claude/) にあります。

クイックリファレンス:

```bash
pnpm install              # 依存関係のインストール
pnpm dev                  # http://localhost:6006 で Storybook を起動
pnpm test                 # vitest（ユニット + Storybook ブラウザモード）
pnpm lint                 # eslint
pnpm format               # prettier
pnpm typecheck            # tsc --noEmit
pnpm build                # dist のビルド + components.json の再生成
pnpm changeset            # リリースノートを記録
```

新しいコンポーネントを追加する場合は [`rules/02-component-conventions.md`](./rules/02-component-conventions.md) を参照してください。Claude Code 上では `/new-component <Name>` を実行することもできます。

## ロードマップ

- [ ] **npm レジストリへの公開** — このスコープ付きパッケージの初回公開が現在 `E404 Not Found - PUT` で失敗しており（[npm/cli#8678](https://github.com/npm/cli/issues/8678) / [#8976](https://github.com/npm/cli/issues/8976) と同じパターン）、調査中です。
- [ ] **GitHub Actions による CI 駆動リリース** — npm への公開が動作するようになるまで、`.github/workflows/release.yml` は一時停止しています（トリガーを `workflow_dispatch` のみに切り替え済み）。自動リリースを再開するには `on: push: branches: [main]` トリガーを復元してください。
- [ ] **インストール手順の差し替え** — npm にパッケージが公開され次第、tarball ベースのワークフローを通常の `pnpm add @kt057/ai-design-system` に戻します。

## ライセンス

[MIT](./LICENSE)
