import { forwardRef } from "react";
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
  type TabsProps as AriaTabsProps,
  type TabListProps as AriaTabListProps,
  type TabProps as AriaTabProps,
  type TabPanelProps as AriaTabPanelProps,
} from "react-aria-components";
import { cn } from "@/utils/cn";

const tabsClass = "flex flex-col gap-3";
const tabListClass = "border-border-default flex border-b";
const tabClass = cn(
  "cursor-pointer px-4 py-2 text-base font-semibold outline-none",
  "text-text-secondary -mb-px border-b-2 border-transparent",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
  "data-[selected]:text-text-primary data-[selected]:border-brand-primary",
  "data-[hovered]:text-text-primary",
  "data-[focus-visible]:ring-border-focus data-[focus-visible]:ring-2 data-[focus-visible]:ring-offset-2",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);
const tabPanelClass = "outline-none";

export type TabsProps = Omit<AriaTabsProps, "className"> & { className?: string };

/**
 * Tabbed navigation built on `react-aria-components`'s `<Tabs>`. Wires up
 * keyboard arrows, focus management, and `aria-selected` for free.
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabList>
 *     <Tab id="overview">Overview</Tab>
 *     <Tab id="settings">Settings</Tab>
 *   </TabList>
 *   <TabPanel id="overview">…</TabPanel>
 *   <TabPanel id="settings">…</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, ...rest },
  ref,
) {
  return <AriaTabs ref={ref} className={cn(tabsClass, className)} {...rest} />;
});

export type TabListProps<T extends object> = Omit<AriaTabListProps<T>, "className"> & {
  className?: string;
};

export const TabList = (<T extends object>({ className, ...rest }: TabListProps<T>) => (
  <AriaTabList className={cn(tabListClass, className)} {...rest} />
)) as <T extends object>(props: TabListProps<T>) => React.ReactElement;

export interface TabProps extends Omit<AriaTabProps, "className" | "children"> {
  className?: string;
  children?: React.ReactNode;
}

export const Tab = ({ className, children, ...rest }: TabProps) => (
  <AriaTab className={cn(tabClass, className)} {...rest}>
    {children}
  </AriaTab>
);

export interface TabPanelProps extends Omit<AriaTabPanelProps, "className" | "children"> {
  className?: string;
  children?: React.ReactNode;
}

export const TabPanel = ({ className, children, ...rest }: TabPanelProps) => (
  <AriaTabPanel className={cn(tabPanelClass, className)} {...rest}>
    {children}
  </AriaTabPanel>
);
