/**
 * Integration tests for react-taml
 */

import { describe, expect, test } from "bun:test";
import { parseTaml } from "@taml/parser";
import { renderTamlNode } from "../renderer.js";

describe("Integration Tests", () => {
  test("should parse and render simple TAML", () => {
    const tamlString = "<red>Error</red>";
    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("should parse and render nested TAML", () => {
    const tamlString = "<bold><red>Bold Red Text</red></bold>";
    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("should parse and render mixed content", () => {
    const tamlString = "Plain text <red>red text</red> more plain";
    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(3); // text, element, text
    }
  });

  test("should handle all TAML tag types", () => {
    const tamlString = `
      <red>red</red>
      <brightGreen>bright green</brightGreen>
      <bgBlue>bg blue</bgBlue>
      <bgBrightYellow>bg bright yellow</bgBrightYellow>
      <bold>bold</bold>
      <italic>italic</italic>
    `;

    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  test("should handle empty content", () => {
    const tamlString = "";
    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    }
  });

  test("should handle text-only content", () => {
    const tamlString = "Just plain text";
    const ast = parseTaml(tamlString);
    const result = renderTamlNode(ast);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(1);
      expect(result[0]).toBe("Just plain text");
    }
  });
});
