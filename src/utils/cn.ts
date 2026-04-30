import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind utility classes safely. Later classes win over earlier ones
 * when they target the same property, so `cn("p-2", "p-4")` resolves to `p-4`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
