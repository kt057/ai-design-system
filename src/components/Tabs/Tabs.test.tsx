import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

describe("Tabs", () => {
  it("renders the first tab as selected by default", () => {
    render(
      <Tabs>
        <TabList aria-label="Sections">
          <Tab id="one">One</Tab>
          <Tab id="two">Two</Tab>
        </TabList>
        <TabPanel id="one">Panel one</TabPanel>
        <TabPanel id="two">Panel two</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Panel one")).toBeInTheDocument();
  });

  it("calls onSelectionChange when a tab is clicked", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs onSelectionChange={onSelectionChange}>
        <TabList aria-label="Sections">
          <Tab id="one">One</Tab>
          <Tab id="two">Two</Tab>
        </TabList>
        <TabPanel id="one">Panel one</TabPanel>
        <TabPanel id="two">Panel two</TabPanel>
      </Tabs>,
    );

    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(onSelectionChange).toHaveBeenCalledWith("two");
  });

  it("does not switch to a disabled tab", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs onSelectionChange={onSelectionChange}>
        <TabList aria-label="Sections">
          <Tab id="one">One</Tab>
          <Tab id="two" isDisabled>
            Two
          </Tab>
        </TabList>
        <TabPanel id="one">Panel one</TabPanel>
        <TabPanel id="two">Panel two</TabPanel>
      </Tabs>,
    );

    onSelectionChange.mockClear();
    await user.click(screen.getByRole("tab", { name: "Two" }));

    expect(onSelectionChange).not.toHaveBeenCalledWith("two");
  });

  it("merges a consumer className on the wrapper via tailwind-merge", () => {
    render(
      <Tabs className="gap-8" data-testid="tabs-wrap">
        <TabList aria-label="Sections">
          <Tab id="one">One</Tab>
        </TabList>
        <TabPanel id="one">Panel one</TabPanel>
      </Tabs>,
    );
    const wrapper = screen.getByTestId("tabs-wrap");
    expect(wrapper.className).toMatch(/gap-8/);
    expect(wrapper.className).not.toMatch(/gap-3/);
  });
});
