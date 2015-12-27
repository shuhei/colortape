# colortape

Colorize test results of [tape](https://github.com/substack/tape)/[node-tap](https://github.com/isaacs/node-tap).

[![Travis build status](https://img.shields.io/travis/shuhei/colortape.svg)](https://travis-ci.org/shuhei/colortape)
[![NPM version](https://img.shields.io/npm/v/colortape.svg)](https://www.npmjs.com/package/colortape)
[![NPM downloads](https://img.shields.io/npm/dm/colortape.svg)](https://www.npmjs.com/package/colortape)

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

With this usage, don't use the exit code of `colortape` command. Use [`$PIPESTATUS`](http://tldp.org/LDP/abs/html/internalvariables.html#PIPESTATUSREF) instead.

## Windows

colortape is not officially supported on Windows because I don't have any Windows box. Here is the CI status on AppVeyor though.

[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/3arg9qd3y3afhg4a?svg=true)](https://ci.appveyor.com/project/shuhei/colortape)
