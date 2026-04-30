import { setProjectAnnotations } from "@storybook/react-vite";
import { screenshot } from "@storycap-testrun/browser";
import { afterEach } from "vitest";
import { page } from "vitest/browser";
import * as projectAnnotations from "./preview";

// Apply Storybook preview decorators / parameters to every browser-mode test.
setProjectAnnotations([projectAnnotations]);

// After each story renders, capture a PNG via @storycap-testrun/browser.
// Output path is configured in vitest.config.ts (`storycap.output.file`).
afterEach(async (context) => {
  await screenshot(page, context);
});
