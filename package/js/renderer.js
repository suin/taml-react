/**
 * AST to JSX renderer for @taml/react
 * Converts TAML AST nodes into React elements with appropriate CSS classes
 */
import { isDocumentNode, isElementNode, isTextNode } from "@taml/ast";
import { createElement } from "react";
/**
 * Cache for memoized rendering results
 */
const renderCache = new Map();
/**
 * Maximum cache size to prevent memory leaks
 */
const MAX_CACHE_SIZE = 1000;
/**
 * Generate CSS class name from TAML tag name
 */
export function generateClassName(tagName) {
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
export function combineClassNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
/**
 * Render a single TAML node to React element
 */
export function renderTamlNode(node, key, additionalClassName) {
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
function renderTextNode(node, _key) {
    if (node.content === "") {
        return null;
    }
    return node.content;
}
/**
 * Render an element node with appropriate CSS class
 */
function renderElementNode(node, key, additionalClassName) {
    const className = generateClassName(node.tagName);
    const combinedClassName = combineClassNames(className, additionalClassName);
    const children = renderChildren(node.children);
    return createElement("span", {
        key,
        className: combinedClassName,
        "data-taml-tag": node.tagName, // For testing and debugging
    }, children);
}
/**
 * Render an array of child nodes
 */
function renderChildren(children, additionalClassName) {
    if (children.length === 0) {
        return [];
    }
    return children
        .map((child, index) => renderTamlNode(child, index, additionalClassName))
        .filter(Boolean);
}
/**
 * Render TAML AST with memoization
 */
export function renderTamlWithMemoization(ast, cacheKey, additionalClassName) {
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
export function clearRenderCache() {
    renderCache.clear();
}
/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
    return {
        size: renderCache.size,
        maxSize: MAX_CACHE_SIZE,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFHSCxPQUFPLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDdEUsT0FBTyxFQUFrQixhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFdEQ7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztBQUVqRDs7R0FFRztBQUNILE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQztBQUU1Qjs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFnQjtJQUNoRCx1QkFBdUI7SUFDdkIsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtRQUN2RSxPQUFPLGVBQWUsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCO1FBRXpELGtDQUFrQztRQUNsQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNuQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMseUJBQXlCO1lBQ3pFLE9BQU8sa0JBQWtCLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCxvQ0FBb0M7UUFDcEMsTUFBTSxLQUFLLEdB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