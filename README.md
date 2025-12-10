# xterm-addon-search-bar-upgraded

**This is a fork of [xterm-addon-search-bar](https://github.com/yinshuxun/xterm-addon-search-bar) with some package updates and improvements**

[![Build Status](https://github.com/KingIronMan2011/xterm-addon-search-bar-upgraded/workflows/ci/badge.svg?branch=main&event=push)](https://github.com/KingIronMan2011/xterm-addon-search-bar-upgraded/actions)
[![Build Status](https://github.com/KingIronMan2011/xterm-addon-search-bar-upgraded/workflows/publish/badge.svg?branch=main&event=push)](https://github.com/KingIronMan2011/xterm-addon-search-bar-upgraded/actions)
[![NPM](https://img.shields.io/npm/v/xterm-addon-search-bar-upgraded.svg)](https://www.npmjs.com/package/xterm-addon-search-bar-upgraded)
![License](https://img.shields.io/npm/l/xterm-addon-search-bar-upgraded.svg)

An addon for [xterm.js](https://github.com/xtermjs/xterm.js) that enables show search bar in terminal. This addon requires xterm.js & xterm-addon-search v4+.

## Install

```bash
npm install --save xterm-addon-search-bar-upgraded
```

## Usage

```ts
import { Terminal } from 'xterm';
import { SearchAddon } from 'xterm-addon-search';
import { SearchAddonBar } from 'xterm-addon-search-bar-upgraded';

const terminal = new Terminal();
const searchAddon = new SearchAddon();
const searchAddonBar = new SearchAddonBar({ searchAddon });
terminal.loadAddon(searchAddon);
terminal.loadAddon(searchAddonBar);
// Can be uesd in a action as click
searchAddonBar.show();
```

See the full [API](https://github.com/yinshuxun/xterm-addon-search-bar/typings/index.d.ts) for more advanced usage
