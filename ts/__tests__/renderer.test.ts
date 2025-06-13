/**
 * Tests for the TAML renderer
 */

import { afterEach, describe, expect, test } from "bun:test";
import {
  createDocument,
  createElement as createTamlElement,
  createText,
} from "@taml/ast";
import { cleanup } from "@testing-library/react";
import {
  clearRenderCache,
  combineClassNames,
  generateClassName,
  getCacheStats,
  renderTamlNode,
} from "../renderer.js";

// Clean up after each test
afterEach(() => {
  cleanup();
  clearRenderCache();
});

describe("generateClassName", () => {
  test("should generate correct class names for standard colors", () => {
    expect(generateClassName("red")).toBe("taml-red");
    expect(generateClassName("green")).toBe("taml-green");
    expect(generateClassName("blue")).toBe("taml-blue");
    expect(generateClassName("black")).toBe("taml-black");
    expect(generateClassName("white")).toBe("taml-white");
    expect(generateClassName("yellow")).toBe("taml-yellow");
    expect(generateClassName("magenta")).toBe("taml-magenta");
    expect(generateClassName("cyan")).toBe("taml-cyan");
  });

  test("should generate correct class names for bright colors", () => {
    expect(generateClassName("brightRed")).toBe("taml-bright-red");
    expect(generateClassName("brightGreen")).toBe("taml-bright-green");
    expect(generateClassName("brightBlue")).toBe("taml-bright-blue");
    expect(generateClassName("brightBlack")).toBe("taml-bright-black");
    expect(generateClassName("brightWhite")).toBe("taml-bright-white");
    expect(generateClassName("brightYellow")).toBe("taml-bright-yellow");
    expect(generateClassName("brightMagenta")).toBe("taml-bright-magenta");
    expect(generateClassName("brightCyan")).toBe("taml-bright-cyan");
  });

  test("should generate correct class names for background colors", () => {
    expect(generateClassName("bgRed")).toBe("taml-bg-red");
    expect(generateClassName("bgGreen")).toBe("taml-bg-green");
    expect(generateClassName("bgBlue")).toBe("taml-bg-blue");
    expect(generateClassName("bgBlack")).toBe("taml-bg-black");
    expect(generateClassName("bgWhite")).toBe("taml-bg-white");
    expect(generateClassName("bgYellow")).toBe("taml-bg-yellow");
    expect(generateClassName("bgMagenta")).toBe("taml-bg-magenta");
    expect(generateClassName("bgCyan")).toBe("taml-bg-cyan");
  });

  test("should generate correct class names for bright background colors", () => {
    expect(generateClassName("bgBrightRed")).toBe("taml-bg-bright-red");
    expect(generateClassName("bgBrightGreen")).toBe("taml-bg-bright-green");
    expect(generateClassName("bgBrightBlue")).toBe("taml-bg-bright-blue");
    expect(generateClassName("bgBrightBlack")).toBe("taml-bg-bright-black");
    expect(generateClassName("bgBrightWhite")).toBe("taml-bg-bright-white");
    expect(generateClassName("bgBrightYellow")).toBe("taml-bg-bright-yellow");
    expect(generateClassName("bgBrightMagenta")).toBe("taml-bg-bright-magenta");
    expect(generateClassName("bgBrightCyan")).toBe("taml-bg-bright-cyan");
  });

  test("should generate correct class names for text styles", () => {
    expect(generateClassName("bold")).toBe("taml-bold");
    expect(generateClassName("dim")).toBe("taml-dim");
    expect(generateClassName("italic")).toBe("taml-italic");
    expect(generateClassName("underline")).toBe("taml-underline");
    expect(generateClassName("strikethrough")).toBe("taml-strikethrough");
  });
});

describe("combineClassNames", () => {
  test("should combine multiple class names", () => {
    expect(combineClassNames("taml", "taml-red", "custom")).toBe(
      "taml taml-red custom",
    );
  });

  test("should filter out undefined values", () => {
    expect(combineClassNames("taml", undefined, "taml-red", undefined)).toBe(
      "taml taml-red",
    );
  });

  test("should handle empty input", () => {
    expect(combineClassNames()).toBe("");
  });

  test("should handle all undefined values", () => {
    expect(combineClassNames(undefined, undefined)).toBe("");
  });
});

describe("renderTamlNode", () => {
  test("should render text nodes correctly", () => {
    const textNode = createText("Hello World");
    const result = renderTamlNode(textNode);
    expect(result).toBe("Hello World");
  });

  test("should render empty text nodes as null", () => {
    const textNode = createText("");
    const result = renderTamlNode(textNode);
    expect(result).toBeNull();
  });

  test("should render element nodes with correct structure", () => {
    const elementNode = createTamlElement("red", [createText("Error")]);
    const result = renderTamlNode(elementNode);

    // The result should be a React element
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });

  test("should render nested elements correctly", () => {
    const nestedElement = createTamlElement("bold", [
      createTamlElement("red", [createText("Bold Red Text")]),
    ]);
    const result = renderTamlNode(nestedElement);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });

  test("should render document nodes by rendering their children", () => {
    const document = createDocument([
      createText("Plain text "),
      createTamlElement("red", [createText("red text")]),
    ]);
    const result = renderTamlNode(document);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(2);
    }
  });

  test("should handle additional class names", () => {
    const elementNode = createTamlElement("red", [createText("Text")]);
    const result = renderTamlNode(elementNode, undefined, "custom-class");

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });
});

describe("cache functionality", () => {
  test("should start with empty cache", () => {
    const stats = getCacheStats();
    expect(stats.size).toBe(0);
    expect(stats.maxSize).toBe(1000);
  });

  test("should clear cache correctly", () => {
    clearRenderCache();
    const stats = getCacheStats();
    expect(stats.size).toBe(0);
  });
});
