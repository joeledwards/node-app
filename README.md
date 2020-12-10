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
// OR
app(options, entry)
// OR
app(options)(entry)
```


## Options

Options may be pass as a second argument to customize behavior.
- `options.handle` | forwarded to underlying [@buzuli/unhandled](https://npmjs.com/package/@buzuli/unhandled) package
- `options.logger` | console-like logger object (logs via `console` built-in by default)
- `options.modules` | every property is asynchronously resolved and injected


## Context

The `context` object injects utilities and customizations/config into the entry point function.
- `context.logger` | the configured logger
- `context.modules` | resolved modules


## Async module resolution and injection

Modules supplied via `options.modules` object are awaited and the resolved values injected under the same names in `context.modules`.


## Signal and Error handling

Exit cleanly on return or exception by the entry function.

Logs and exits on (tunable via `options.unhandled`):
- unhandled rejection
- uncaught rejection
- SIGINT
- SIGTERM

