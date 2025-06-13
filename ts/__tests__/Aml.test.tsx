/**
 * Tests for the Taml React component
 */

import { afterEach, describe, expect, test } from "bun:test";
import { cleanup, render } from "@testing-library/react";
import { Taml } from "../Taml.js";

// Clean up after each test
afterEach(() => {
  cleanup();
});

describe("Taml Component", () => {
  test("should render simple text without TAML tags", () => {
    const { container } = render(<Taml>Hello World</Taml>);

    expect(container.textContent).toBe("Hello World");
    expect(container.querySelector(".taml")).toBeTruthy();
  });

  test("should render single TAML tag correctly", () => {
    const { container } = render(<Taml>{"<red>Error</red>"}</Taml>);

    expect(container.textContent).toBe("Error");
    expect(container.querySelector(".taml")).toBeTruthy();
    expect(container.querySelector(".taml-red")).toBeTruthy();
  });

  test("should render nested TAML tags correctly", () => {
    const { container } = render(
      <Taml>{"<bold><red>Bold Red Text</red></bold>"}</Taml>,
    );

    expect(container.textContent).toBe("Bold Red Text");
    expect(container.querySelector(".taml-bold")).toBeTruthy();
    expect(container.querySelector(".taml-red")).toBeTruthy();
  });

  test("should render mixed content correctly", () => {
    const { container } = render(
      <Taml>{"Plain text <red>red text</red> more plain text"}</Taml>,
    );

    expect(container.textContent).toBe("Plain text red text more plain text");
    expect(container.querySelector(".taml-red")).toBeTruthy();
  });

  test("should apply additional className", () => {
    const { container } = render(
      <Taml className="custom-class">{"<red>Text</red>"}</Taml>,
    );

    const tamlElement = container.querySelector(".taml");
    expect(tamlElement).toBeTruthy();
    expect(tamlElement?.classList.contains("custom-class")).toBe(true);
  });

  test("should handle empty content", () => {
    const { container } = render(<Taml>{""}</Taml>);

    expect(container.querySelector(".taml")).toBeTruthy();
    expect(container.textContent).toBe("");
  });

  test("should handle all TAML color tags", () => {
    const tamlContent = `
      <black>black</black>
      <red>red</red>
      <green>green</green>
      <yellow>yellow</yellow>
      <blue>blue</blue>
      <magenta>magenta</magenta>
      <cyan>cyan</cyan>
      <white>white</white>
    `;

    const { container } = render(<Taml>{tamlContent}</Taml>);

    expect(container.querySelector(".taml-black")).toBeTruthy();
    expect(container.querySelector(".taml-red")).toBeTruthy();
    expect(container.querySelector(".taml-green")).toBeTruthy();
    expect(container.querySelector(".taml-yellow")).toBeTruthy();
    expect(container.querySelector(".taml-blue")).toBeTruthy();
    expect(container.querySelector(".taml-magenta")).toBeTruthy();
    expect(container.querySelector(".taml-cyan")).toBeTruthy();
    expect(container.querySelector(".taml-white")).toBeTruthy();
  });

  test("should handle bright color tags", () => {
    const tamlContent = `
      <brightRed>bright red</brightRed>
      <brightGreen>bright green</brightGreen>
      <brightBlue>bright blue</brightBlue>
    `;

    const { container } = render(<Taml>{tamlContent}</Taml>);

    expect(container.querySelector(".taml-bright-red")).toBeTruthy();
    expect(container.querySelector(".taml-bright-green")).toBeTruthy();
    expect(container.querySelector(".taml-bright-blue")).toBeTruthy();
  });

  test("should handle background color tags", () => {
    const tamlContent = `
      <bgRed>bg red</bgRed>
      <bgGreen>bg green</bgGreen>
      <bgBrightBlue>bg bright blue</bgBrightBlue>
    `;

    const { container } = render(<Taml>{tamlContent}</Taml>);

    expect(container.querySelector(".taml-bg-red")).toBeTruthy();
    expect(container.querySelector(".taml-bg-green")).toBeTruthy();
    expect(container.querySelector(".taml-bg-bright-blue")).toBeTruthy();
  });

  test("should handle text style tags", () => {
    const tamlContent = `
      <bold>bold</bold>
      <italic>italic</italic>
      <underline>underline</underline>
      <strikethrough>strikethrough</strikethrough>
      <dim>dim</dim>
    `;

    const { container } = render(<Taml>{tamlContent}</Taml>);

    expect(container.querySelector(".taml-bold")).toBeTruthy();
    expect(container.querySelector(".taml-italic")).toBeTruthy();
    expect(container.querySelector(".taml-underline")).toBeTruthy();
    expect(container.querySelector(".taml-strikethrough")).toBeTruthy();
    expect(container.querySelector(".taml-dim")).toBeTruthy();
  });

  test("should handle complex nested structures", () => {
    const tamlContent = `
      <bgRed>
        <white>
          <bold>Alert: </bold>
          <italic>System error detected</italic>
        </white>
      </bgRed>
    `;

    const { container } = render(<Taml>{tamlContent}</Taml>);

    expect(container.textContent?.replace(/\s+/g, " ").trim()).toContain(
      "Alert: System error detected",
    );
    expect(container.querySelector(".taml-bg-red")).toBeTruthy();
    expect(container.querySelector(".taml-white")).toBeTruthy();
    expect(container.querySelector(".taml-bold")).toBeTruthy();
    expect(container.querySelector(".taml-italic")).toBeTruthy();
  });

  test("should preserve whitespace", () => {
    const { container } = render(
      <Taml>{"  <red>  spaced text  </red>  "}</Taml>,
    );

    expect(container.textContent).toBe("    spaced text    ");
  });

  test("should handle data attributes for debugging", () => {
    const { container } = render(<Taml>{"<red>Text</red>"}</Taml>);

    const redElement = container.querySelector(".taml-red");
    expect(redElement?.getAttribute("data-taml-tag")).toBe("red");
  });
});
