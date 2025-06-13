/**
 * Simple tests for react-taml without Testing Library
 */

import { describe, expect, test } from "bun:test";
import { combineClassNames, generateClassName } from "../renderer.js";

describe("generateClassName", () => {
  test("should generate correct class names for standard colors", () => {
    expect(generateClassName("red")).toBe("taml-red");
    expect(generateClassName("green")).toBe("taml-green");
    expect(generateClassName("blue")).toBe("taml-blue");
  });

  test("should generate correct class names for bright colors", () => {
    expect(generateClassName("brightRed")).toBe("taml-bright-red");
    expect(generateClassName("brightGreen")).toBe("taml-bright-green");
  });

  test("should generate correct class names for background colors", () => {
    expect(generateClassName("bgRed")).toBe("taml-bg-red");
    expect(generateClassName("bgBrightBlue")).toBe("taml-bg-bright-blue");
  });

  test("should generate correct class names for text styles", () => {
    expect(generateClassName("bold")).toBe("taml-bold");
    expect(generateClassName("italic")).toBe("taml-italic");
  });
});

describe("combineClassNames", () => {
  test("should combine multiple class names", () => {
    expect(combineClassNames("taml", "taml-red", "custom")).toBe(
      "taml taml-red custom",
    );
  });

  test("should filter out undefined values", () => {
    expect(combineClassNames("taml", undefined, "taml-red")).toBe(
      "taml taml-red",
    );
  });
});
