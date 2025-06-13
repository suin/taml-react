/**
 * Test setup for @taml/react
 * Configures Happy DOM for Bun test runner
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register Happy DOM globally for all tests
GlobalRegistrator.register();
