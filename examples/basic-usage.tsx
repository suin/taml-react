/**
 * Basic usage examples for react-taml
 */

import { Taml } from "../src/index.js";
import "../src/styles.css";

// Basic color example
export function BasicColorExample() {
  return (
    <div>
      <h2>Basic Colors</h2>
      <Taml>{"<red>Error:</red> Something went wrong"}</Taml>
      <br />
      <Taml>{"<green>Success:</green> Operation completed"}</Taml>
      <br />
      <Taml>{"<yellow>Warning:</yellow> Please check your input"}</Taml>
      <br />
      <Taml>{"<blue>Info:</blue> Additional information available"}</Taml>
    </div>
  );
}

// Nested formatting example
export function NestedFormattingExample() {
  return (
    <div>
      <h2>Nested Formatting</h2>
      <Taml>
        {"<bold><red>Critical Alert:</red></bold> System overload detected"}
      </Taml>
      <br />
      <Taml>
        {
          "<bgYellow><black><bold> WARNING </bold></black></bgYellow> High memory usage"
        }
      </Taml>
    </div>
  );
}

// Complex log output example
export function LogOutputExample() {
  const logEntries = [
    "<dim>2024-12-07 10:30:15</dim> <blue>[INFO]</blue> Application starting",
    "<dim>2024-12-07 10:30:16</dim> <green>[SUCCESS]</green> Database connected",
    "<dim>2024-12-07 10:30:45</dim> <yellow>[WARN]</yellow> <bold>High memory usage:</bold> 85%",
    "<dim>2024-12-07 10:31:02</dim> <red>[ERROR]</red> <bold>Database query failed</bold>",
  ];

  return (
    <div>
      <h2>Log Output</h2>
      <div
        style={{
          fontFamily: "monospace",
          backgroundColor: "#1e1e1e",
          padding: "1rem",
          color: "white",
        }}
      >
        {logEntries.map((entry, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={`log-${index}`}>
            <Taml>{entry}</Taml>
          </div>
        ))}
      </div>
    </div>
  );
}

// Terminal-style output example
export function TerminalExample() {
  return (
    <div>
      <h2>Terminal Output</h2>
      <div
        style={{
          fontFamily: "monospace",
          backgroundColor: "#000",
          padding: "1rem",
          color: "#fff",
        }}
      >
        <Taml>
          {"<green>user@computer</green>:<blue>~/project</blue>$ npm test"}
        </Taml>
        <br />
        <br />
        <Taml>{"<bold><blue>Running test suite...</blue></bold>"}</Taml>
        <br />
        <br />
        <Taml>{"<green>✓</green> should render basic colors"}</Taml>
        <br />
        <Taml>{"<green>✓</green> should handle nested tags"}</Taml>
        <br />
        <Taml>{"<red>✗</red> should validate input <dim>(failed)</dim>"}</Taml>
        <br />
        <br />
        <Taml>{"<bold>Results:</bold>"}</Taml>
        <br />
        <Taml>
          {"  <green><bold>2 passing</bold></green> <dim>(45ms)</dim>"}
        </Taml>
        <br />
        <Taml>{"  <red><bold>1 failing</bold></red>"}</Taml>
      </div>
    </div>
  );
}

// Error handling example
export function ErrorHandlingExample() {
  const handleError = (error: Error) => {
    console.error("TAML Parse Error:", error.message);
  };

  return (
    <div>
      <h2>Error Handling</h2>

      <h3>Valid TAML:</h3>
      <Taml>{"<green>This is valid TAML</green>"}</Taml>

      <h3>Invalid TAML with fallback:</h3>
      <Taml
        onError={handleError}
        fallback={<span style={{ color: "red" }}>Failed to parse TAML</span>}
      >
        {"<invalidTag>This will cause an error</invalidTag>"}
      </Taml>

      <h3>Custom styling:</h3>
      <Taml className="custom-terminal">
        {
          "<bgBlue><white><bold> SYSTEM </bold></white></bgBlue> All systems operational"
        }
      </Taml>
    </div>
  );
}

// All examples combined
export function AllExamples() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>React TAML Examples</h1>

      <BasicColorExample />
      <hr />

      <NestedFormattingExample />
      <hr />

      <LogOutputExample />
      <hr />

      <TerminalExample />
      <hr />

      <ErrorHandlingExample />

      <style>{`
        .custom-terminal {
          font-family: 'Courier New', monospace;
          background: #2d2d2d;
          padding: 0.5rem;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
