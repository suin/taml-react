/**
 * Main Taml React component for rendering TAML markup
 */
import type { ReactNode } from "react";
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
export declare function Taml({ children, className, onError, fallback, }: TamlProps): ReactNode;
/**
 * Default export for convenience
 */
export default Taml;
//# sourceMappingURL=Taml.d.ts.map