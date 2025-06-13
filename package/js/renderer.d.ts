/**
 * AST to JSX renderer for @taml/react
 * Converts TAML AST nodes into React elements with appropriate CSS classes
 */
import type { TamlNode, TamlTag } from "@taml/ast";
import { type ReactNode } from "react";
/**
 * Generate CSS class name from TAML tag name
 */
export declare function generateClassName(tagName: TamlTag): string;
/**
 * Combine multiple CSS class names
 */
export declare function combineClassNames(...classes: (string | undefined)[]): string;
/**
 * Render a single TAML node to React element
 */
export declare function renderTamlNode(node: TamlNode, key?: string | number, additionalClassName?: string): ReactNode;
/**
 * Render TAML AST with memoization
 */
export declare function renderTamlWithMemoization(ast: TamlNode, cacheKey: string, additionalClassName?: string): ReactNode;
/**
 * Clear the render cache
 */
export declare function clearRenderCache(): void;
/**
 * Get cache statistics for debugging
 */
export declare function getCacheStats(): {
    size: number;
    maxSize: number;
};
//# sourceMappingURL=renderer.d.ts.map