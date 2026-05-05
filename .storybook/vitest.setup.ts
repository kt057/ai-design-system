import { setProjectAnnotations } from "@storybook/react-vite";
import { screenshot } from "@storycap-testrun/browser";
import { afterEach } from "vitest";
import { page } from "vitest/browser";
import * as projectAnnotations from "./preview";

// Apply Storybook preview decorators / parameters to every browser-mode test.
setProjectAnnotations([projectAnnotations]);

// VRT-only stabilization. Two concerns:
// 1. Linux Chromium defaults to subpixel (LCD) anti-aliasing, which produces
//    per-channel pixel variance at glyph edges and rounded borders between
//    runs — enough to fail reg-suit's thresholdRate: 0 even when nothing
//    changed (e.g. Input/Disabled, Link/Disabled). Grayscale AA + geometric
//    text rendering gives byte-deterministic screenshots.
// 2. Pin the root font-size so rem-based tokens (`--radius-md`, `--text-base`,
//    …) resolve to identical px values regardless of host browser zoom or
//    user-agent default font-size.
const vrtStabilization = document.createElement("style");
vrtStabilization.setAttribute("data-vrt", "font-rendering");
vrtStabilization.textContent = `
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
  }
`;
document.head.appendChild(vrtStabilization);

// After each story renders, capture a PNG via @storycap-testrun/browser.
// Output path is configured in vitest.config.ts (`storycap.output.file`).
afterEach(async (context) => {
  await screenshot(page, context);
});
