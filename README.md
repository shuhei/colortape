# colortape

Colorize test results of [tape](https://github.com/substack/tape)/[node-tape](https://github.com/isaacs/node-tap).

[![NPM version](https://badge.fury.io/js/colortape.png)](http://badge.fury.io/js/colortape)

## Installation

```sh
npm install -g colortape
```

To use with `npm test`, install locally.

```sh
npm install -save-dev colortape
```

## Usage

### Wrapper command (recommended)

Use `colortape` command instead of `tape` command.

```sh
colortape test/foo.js
```

This usage is recommended because it exits with the same exit code as `tape` command.

### Pipe

Pipe the result of `tape` command.

```sh
tape test/foo.js | colortape
```

This usage is not recommended because it exits with 0 even when `tape` command throws an error. This is inevitable due to the limitation of pipe.
