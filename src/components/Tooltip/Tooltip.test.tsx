import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button/Button";
import { Tooltip, TooltipTrigger } from "./Tooltip";

describe("Tooltip", () => {
  it("does not render the tooltip until the trigger is focused", () => {
    render(
      <TooltipTrigger delay={0}>
        <Button>Trigger</Button>
        <Tooltip>Hint</Tooltip>
      </TooltipTrigger>,
    );
    expect(screen.queryByText("Hint")).not.toBeInTheDocument();
  });

  it("reveals the tooltip on focus", async () => {
    const user = userEvent.setup();
    render(
      <TooltipTrigger delay={0}>
        <Button>Trigger</Button>
        <Tooltip>Hint</Tooltip>
      </TooltipTrigger>,
    );

    await user.tab();
    expect(await screen.findByText("Hint")).toBeInTheDocument();
  });

  it("merges a consumer className via tailwind-merge", async () => {
    const user = userEvent.setup();
    render(
      <TooltipTrigger delay={0}>
        <Button>Trigger</Button>
        <Tooltip className="bg-error-bg">Hint</Tooltip>
      </TooltipTrigger>,
    );
    await user.tab();
    const tip = await screen.findByText("Hint");
    expect(tip.className).toMatch(/bg-error-bg/);
    expect(tip.className).not.toMatch(/bg-text-primary/);
  });
});
