# @taml/react

A React component for rendering TAML (Terminal ANSI Markup Language) as styled JSX elements.

[![npm version](https://badge.fury.io/js/@taml/react.svg)](https://badge.fury.io/js/@taml/react)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Features

- 🎨 **Complete TAML Support**: Renders all 37 TAML tags (colors, backgrounds, text styles)
- ⚡ **Performance Optimized**: Built-in memoization and efficient rendering
- 🔧 **TypeScript Ready**: Full type safety with comprehensive TypeScript definitions
- 🎯 **Zero Dependencies**: Only requires React as a peer dependency
- 🧪 **Well Tested**: Comprehensive test suite with high coverage
- 📦 **Tree Shakable**: Optimized for modern bundlers
- 🎭 **CSS Classes**: Uses semantic CSS classes for easy customization

## Installation

```bash
npm install @taml/react
# or
yarn add @taml/react
# or
bun add @taml/react
```

## Quick Start

```tsx
import { Taml } from '@taml/react';
import '@taml/react/styles.css';

function App() {
  return (
    <div>
      <Taml>{"<red>Error:</red> Something went wrong"}</Taml>
      <Taml>{"<green>Success:</green> Operation completed"}</Taml>
      <Taml>{"<bold><blue>Info:</blue></bold> Additional details"}</Taml>
    </div>
  );
}
```

## Understanding TAML Strings vs JSX

**Important:** The `<Taml>` component expects TAML markup as a **string**, not JSX elements.

### ✅ Correct Usage (TAML as strings):
```tsx
<Taml>{"<red>Error:</red> Something went wrong"}</Taml>
<Taml>{"<bold><green>Success!</green></bold>"}</Taml>
```

### ❌ Incorrect Usage (JSX elements):
```tsx
<Taml><red>Error:</red> Something went wrong</Taml>
<Taml><bold><green>Success!</green></bold></Taml>
```

The TAML tags like `<red>`, `<bold>`, etc. are **markup syntax** that gets parsed from the string, not React components.

## API Reference

### `<Taml>` Component

The main component for rendering TAML markup.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | **required** | TAML markup string to parse and render |
| `className` | `string` | `undefined` | Additional CSS classes to apply to the root element |
| `onError` | `(error: Error) => void` | `undefined` | Callback function called when parsing fails |
| `fallback` | `ReactNode` | `undefined` | Fallback content to display when parsing fails |

#### Example

```tsx
<Taml
  className="terminal-output"
  onError={(error) => console.error('TAML Error:', error)}
  fallback={<span>Invalid TAML</span>}
>
  {"<red>Error message</red>"}
</Taml>
```

## Supported TAML Tags

### Standard Colors (8 tags)
- `<black>`, `<red>`, `<green>`, `<yellow>`
- `<blue>`, `<magenta>`, `<cyan>`, `<white>`

### Bright Colors (8 tags)
- `<brightBlack>`, `<brightRed>`, `<brightGreen>`, `<brightYellow>`
- `<brightBlue>`, `<brightMagenta>`, `<brightCyan>`, `<brightWhite>`

### Background Colors (16 tags)
- Standard: `<bgBlack>`, `<bgRed>`, `<bgGreen>`, etc.
- Bright: `<bgBrightBlack>`, `<bgBrightRed>`, `<bgBrightGreen>`, etc.

### Text Styles (5 tags)
- `<bold>`, `<dim>`, `<italic>`, `<underline>`, `<strikethrough>`

## CSS Classes

Each TAML tag is rendered as a `<span>` element with corresponding CSS classes:

- **Root wrapper**: `.taml`
- **Colors**: `.taml-red`, `.taml-green`, `.taml-blue`, etc.
- **Bright colors**: `.taml-bright-red`, `.taml-bright-green`, etc.
- **Backgrounds**: `.taml-bg-red`, `.taml-bg-green`, etc.
- **Bright backgrounds**: `.taml-bg-bright-red`, `.taml-bg-bright-green`, etc.
- **Text styles**: `.taml-bold`, `.taml-italic`, `.taml-underline`, etc.

## Examples

### Basic Usage

```tsx
import { Taml } from '@taml/react';
import '@taml/react/styles.css';

// Simple colored text
<Taml>{"<red>Error:</red> File not found"}</Taml>

// Nested formatting
<Taml>{"<bold><red>Critical:</red></bold> System failure"}</Taml>

// Background colors
<Taml>{"<bgYellow><black> WARNING </black></bgYellow>"}</Taml>
```

### Log Output

```tsx
function LogViewer({ logs }) {
  return (
    <div className="log-container">
      {logs.map((entry, index) => (
        <div key={index}>
          <Taml>{entry}</Taml>
        </div>
      ))}
    </div>
  );
}

// Usage
const logs = [
  "<dim>2024-12-07 10:30:15</dim> <blue>[INFO]</blue> Application started",
  "<dim>2024-12-07 10:30:16</dim> <green>[SUCCESS]</green> Database connected",
  "<dim>2024-12-07 10:30:45</dim> <yellow>[WARN]</yellow> High memory usage",
  "<dim>2024-12-07 10:31:02</dim> <red>[ERROR]</red> Connection failed",
];
```

### Terminal Output

```tsx
function TerminalOutput() {
  return (
    <div className="terminal">
      <Taml>{"<green>user@computer</green>:<blue>~/project</blue>$ npm test"}</Taml>
      <br />
      <Taml>{"<bold><blue>Running tests...</blue></bold>"}</Taml>
      <br />
      <Taml>{"<green>✓</green> All tests passed"}</Taml>
    </div>
  );
}
```

### Error Handling

```tsx
function SafeTamlRenderer({ content }) {
  const handleError = (error) => {
    console.error('Failed to parse TAML:', error.message);
  };

  return (
    <Taml
      onError={handleError}
      fallback={<span className="error">Invalid TAML content</span>}
    >
      {content}
    </Taml>
  );
}
```

## Styling

### Default Styles

The package includes default CSS styles that map TAML tags to appropriate colors and formatting. Import the stylesheet:

```tsx
import '@taml/react/styles.css';
```

### Custom Styling

You can override the default styles or add your own:

```css
/* Override default colors */
.taml-red {
  color: #ff4444;
}

/* Add custom terminal styling */
.terminal .taml {
  font-family: 'Courier New', monospace;
  background: #1e1e1e;
  color: #ffffff;
  padding: 1rem;
  border-radius: 4px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .taml-white {
    color: #ffffff;
  }
  .taml-black {
    color: #808080;
  }
}
```

### CSS Custom Properties

For dynamic theming, you can use CSS custom properties:

```css
.taml {
  --taml-red: #ff0000;
  --taml-green: #00ff00;
  --taml-blue: #0000ff;
}

.taml-red {
  color: var(--taml-red);
}
```

## Advanced Usage

### Utility Functions

The package exports utility functions for advanced use cases:

```tsx
import {
  generateClassName,
  combineClassNames,
  renderTamlNode
} from '@taml/react';
import { parseAml } from '@taml/parser';

// Generate CSS class name from TAML tag
const className = generateClassName('brightRed'); // 'taml-bright-red'

// Combine multiple class names
const combined = combineClassNames('taml', 'custom', undefined); // 'taml custom'

// Parse TAML to AST (import from @taml/parser)
const ast = parseAml('<red>Hello</red>');

// Render AST node to React element
const element = renderTamlNode(ast);
```

### Performance Optimization

The component includes built-in performance optimizations:

- **Memoization**: Parsed results are cached for identical input strings
- **Efficient rendering**: Minimal React element creation
- **Tree shaking**: Only import what you need

```tsx
import { clearRenderCache, getCacheStats } from '@taml/react';

// Clear the render cache if needed
clearRenderCache();

// Get cache statistics
const stats = getCacheStats();
console.log(`Cache size: ${stats.size}/${stats.maxSize}`);
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { TamlProps, TamlTag } from '@taml/react';
import type { TamlNode } from '@taml/ast';

// Component props are fully typed - children MUST be a string
const props: TamlProps = {
  children: "<red>Error</red>",  // ✅ String literal
  className: 'custom',
  onError: (error: Error) => console.error(error),
  fallback: <span>Fallback</span>
};

// This would cause a TypeScript error:
// const invalidProps: TamlProps = {
//   children: <red>Error</red>,  // ❌ JSX element - TypeScript error
// };

// TAML tags are type-checked
const validTag: TamlTag = 'red'; // ✓
const invalidTag: TamlTag = 'purple'; // ✗ TypeScript error

// AST node types are imported from @taml/ast
const node: TamlNode = { /* ... */ };
```

## Common Mistakes

### Mistake 1: Using JSX Elements Instead of Strings
```tsx
// ❌ Wrong - This treats <red> as a JSX component
<Taml><red>Error</red></Taml>

// ✅ Correct - This treats <red> as TAML markup
<Taml>{"<red>Error</red>"}</Taml>
```

### Mistake 2: Forgetting Curly Braces
```tsx
// ❌ Wrong - This passes the literal string "<red>Error</red>"
<Taml>"<red>Error</red>"</Taml>

// ✅ Correct - This passes the string content to be parsed
<Taml>{"<red>Error</red>"}</Taml>
```

### Mistake 3: Mixing TAML and JSX
```tsx
// ❌ Wrong - Mixing TAML strings with JSX elements
<Taml>{"<red>Error:</red>"} <span>Additional info</span></Taml>

// ✅ Correct - Keep TAML content as pure strings
<Taml>{"<red>Error:</red> Additional info"}</Taml>
// Or use separate elements:
<div>
  <Taml>{"<red>Error:</red>"}</Taml>
  <span> Additional info</span>
</div>
```

## Browser Support

- Modern browsers with ES2022 support
- React 16.8+ (hooks support required)
- TypeScript 5.0+ (for TypeScript users)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details.

## Related Packages

- [`@taml/parser`](../parser) - Core TAML parsing functionality
- [`@taml/ast`](../ast) - AST types and utilities for TAML
- [`@taml/encoder`](../encoder) - Convert ANSI escape sequences to TAML

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
