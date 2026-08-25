/**
 * PreInvocation hook script for CAIRRL Lab website.
 * Injects a reminder into the AI agent loop to adhere to the core documentation.
 */
import fs from 'fs';

try {
  fs.readFileSync(0, 'utf-8');
} catch {
  // Stdin empty or not available
}

const response = {
  injectSteps: [
    {
      ephemeralMessage:
        'CAIRRL Directives: Remember to consult Rules.md, PRD.md, Memory.md, Design.md, and Architecture.md before making modifications.',
    },
  ],
};

console.log(JSON.stringify(response));
