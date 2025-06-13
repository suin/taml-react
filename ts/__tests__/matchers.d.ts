/**
 * TypeScript declarations for Testing Library matchers
 */

// noinspection ES6UnusedImports
import type { AsymmetricMatchers, Matchers } from "bun:test";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
