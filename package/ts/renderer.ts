/**
 * AST to JSX renderer for @taml/react
 * Converts TAML AST nodes into React elements with appropriate CSS classes
 */

import type { ElementNode, TamlNode, TamlTag, TextNode } from "@taml/ast";
import { isDocumentNode, isElementNode, isTextNode } from "@taml/ast";
import { type ReactNode, createElement } from "react";

/**
 * Cache for memoized rendering results
 */
const renderCache = new Map<string, ReactNode>();

/**
 * Maximum cache size to prevent memory leaks
 */
const MAX_CACHE_SIZE = 1000;

/**
 * Generate CSS class name from TAML tag name
 */
export function generateClassName(tagName: TamlTag): string {
  // Handle bright colors
  if (tagName.startsWith("bright")) {
    const color = tagName.slice(6).toLowerCase(); // Remove 'bright' prefix
    return `taml-bright-${color}`;
  }

  // Handle background colors
  if (tagName.startsWith("bg")) {
    const remaining = tagName.slice(2); // Remove 'bg' prefix

    // Handle bright background colors
    if (remaining.startsWith("Bright")) {
      const color = remaining.slice(6).toLowerCase(); // Remove 'Bright' prefix
      return `taml-bg-bright-${color}`;
    }

    // Handle standard background colors
    const color = remaining.toLowerCase();
    return `taml-bg-${color}`;
  }

  // Handle standard colors and text styles
  return `taml-${tagName.toLowerCase()}`;
}

/**
 * Combine multiple CSS class names
 */
export function combineClassNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Render a single TAML node to React element
 */
export function renderTamlNode(
  node: TamlNode,
  key?: string | number,
  additionalClassName?: string,
): ReactNode {
  if (isTextNode(node)) {
    return renderTextNode(node, key);
  }

  if (isElementNode(node)) {
    return renderElementNode(node, key, additionalClassName);
  }

  if (isDocumentNode(node)) {
    return renderChildren(node.children, additionalClassName);
  }

  // Fallback for unknown node types
  console.warn(`Unknown TAML node type: ${node.type}`);
  return null;
}

/**
 * Render a text node
 */
function renderTextNode(node: TextNode, _key?: string | number): ReactNode {
  if (node.content === "") {
    return null;
  }

  return node.content;
}

/**
 * Render an element node with appropriate CSS class
 */
function renderElementNode(
  node: ElementNode,
  key?: string | number,
  additionalClassName?: string,
): ReactNode {
  const className = generateClassName(node.tagName);
  const combinedClassName = combineClassNames(className, additionalClassName);

  const children = renderChildren(node.children);

  return createElement(
    "span",
    {
      key,
      className: combinedClassName,
      "data-taml-tag": node.tagName, // For testing and debugging
    },
    children,
  );
}

/**
 * Render an array of child nodes
 */
function renderChildren(
  children: TamlNode[],
  additionalClassName?: string,
): ReactNode[] {
  if (children.length === 0) {
    return [];
  }

  return children
    .map((child, index) => renderTamlNode(child, index, additionalClassName))
    .filter(Boolean) as ReactNode[];
}

/**
 * Render TAML AST with memoization
 */
export function renderTamlWithMemoization(
  ast: TamlNode,
  cacheKey: string,
  additionalClassName?: string,
): ReactNode {
  // Check cache first
  const fullCacheKey = additionalClassName
    ? `${cacheKey}:${additionalClassName}`
    : cacheKey;

  const cached = renderCache.get(fullCacheKey);
  if (cached !== undefined) {
    return cached;
  }

  // Render the AST
  const result = renderTamlNode(ast, undefined, additionalClassName);

  // Cache the result (with size limit)
  if (renderCache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entries (simple FIFO)
    const firstKey = renderCache.keys().next().value;
    if (firstKey !== undefined) {
      renderCache.delete(firstKey);
    }
  }

  renderCache.set(fullCacheKey, result);
  return result;
}

/**
 * Clear the render cache
 */
export function clearRenderCache(): void {
  renderCache.clear();
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats(): { size: number; maxSize: number } {
  return {
    size: renderCache.size,
    maxSize: MAX_CACHE_SIZE,
  };
}
