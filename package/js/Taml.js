import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Main Taml React component for rendering TAML markup
 */
import { parseTamlSafe } from "@taml/parser";
import { combineClassNames, renderTamlWithMemoization } from "./renderer.js";
/**
 * Taml component that parses and renders TAML markup as styled JSX
 */
export function Taml({ children, className, onError, fallback, }) {
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
            return (_jsx("span", { className: combineClassNames("taml", "taml-error", className), title: `TAML Parse Error: ${error?.message}`, children: "[TAML Parse Error]" }));
        }
        // Silent failure in production
        return null;
    }
    // Render the AST to React elements
    const element = renderTamlWithMemoization(result.ast, children, className);
    // Wrap the rendered content in a root container
    const rootClassName = combineClassNames("taml", className);
    return _jsx("span", { className: rootClassName, children: element });
}
/**
 * Default export for convenience
 */
export default Taml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL1RhbWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHlCQUF5QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBZ0I3RTs7R0FFRztBQUNILE1BQU0sVUFBVSxJQUFJLENBQUMsRUFDbkIsUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBQ1AsUUFBUSxHQUNFO0lBQ1YsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXZDLHNCQUFzQjtJQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFFekIsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBRUQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUFFLENBQUM7WUFDM0MsT0FBTyxDQUNMLGVBQ0UsU0FBUyxFQUFFLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLEVBQzdELEtBQUssRUFBRSxxQkFBcUIsS0FBSyxFQUFFLE9BQU8sRUFBRSxtQ0FHdkMsQ0FDUixDQUFDO1FBQ0osQ0FBQztRQUVELCtCQUErQjtRQUMvQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFM0UsZ0RBQWdEO0lBQ2hELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUUzRCxPQUFPLGVBQU0sU0FBUyxFQUFFLGFBQWEsWUFBRyxPQUFPLEdBQVEsQ0FBQztBQUMxRCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxlQUFlLElBQUksQ0FBQyJ9