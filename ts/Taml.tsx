/**
 * Main Taml React component for rendering TAML markup
 */

import { parseTamlSafe } from "@taml/parser";
import type { ReactNode } from "react";
import { combineClassNames, renderTamlWithMemoization } from "./renderer.js";

/**
 * Props for the Taml component
 */
export interface TamlProps {
  /** TAML markup string to parse and render */
  children: string;
  /** Additional CSS classes to apply to the root element */
  className?: string;
  /** Error callback function called when parsing fails */
  onError?: (error: Error) => void;
  /** Fallback content to display when parsing fails */
  fallback?: ReactNode;
}

/**
 * Taml component that parses and renders TAML markup as styled JSX
 */
export function Taml({
  children,
  className,
  onError,
  fallback,
}: TamlProps): ReactNode {
  const result = parseTamlSafe(children);

  // Handle parse errors
  if (!result.success) {
    const { error } = result;

    if (onError) {
      onError(error);
    }

    if (fallback !== undefined) {
      return fallback;
    }

    if (process.env.NODE_ENV === "development") {
      return (
        <span
          className={combineClassNames("taml", "taml-error", className)}
          title={`TAML Parse Error: ${error?.message}`}
        >
          [TAML Parse Error]
        </span>
      );
    }

    // Silent failure in production
    return null;
  }

  // Render the AST to React elements
  const element = renderTamlWithMemoization(result.ast, children, className);

  // Wrap the rendered content in a root container
  const rootClassName = combineClassNames("taml", className);

  return <span className={rootClassName}>{element}</span>;
}

/**
 * Default export for convenience
 */
export default Taml;
