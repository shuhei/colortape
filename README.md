# colortape

Colorize test results of [tape](https://github.com/substack/tape)/[node-tape](https://github.com/isaacs/node-tap).

[![NPM version](https://badge.fury.io/js/colortape.png)](http://badge.fury.io/js/colortape)

## Installation

```sh
npm install -g colortape
```

## Usage

Pipe the result of `tape` command.

```sh
tape test/foo.js | colortape
```

To use with `npm test`, install locally

```sh
npm install -save-dev colortape
```

and configure your `package.json`.

```json
{
  "scripts": {
    "test": "tape test/**/*.js | colortape"
  }
}
```
