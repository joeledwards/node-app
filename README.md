# app

Node.js app wrapper

## Installation

`$ npm install @buzuli/app`

## Usage

```
const app = require('@buzuli/app')

const entry = async (context) => {
    // app entry point
}

const options = {
  unhandled: {
    sigint: { exit: false }
  }
}

app(entry, options)
```

## Options

Options may be pass as a second argument to customize behavior.
- `options.logger` | console-like logger object (logs via `console` built-in by default)
- `options.unhandled` | forwarded to underlying [@buzuli/unhandled](https://npmjs.com/package/@buzuli/unhandled) package

## Context
The `context` object injects utilities and customizations/config into the entry point function.

## Behavior

Exit cleanly on return or exception by the entry function.

Logs and exits on (tunable via `options.unhandled`):
- unhandled rejection
- uncaught rejection
- SIGINT
- SIGTERM

