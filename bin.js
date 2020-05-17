#!/usr/bin/env node

// to enable --files flag from ts-node
process.env.TS_NODE_FILES = true;
require('ts-node').register({
  dir: __dirname,
});
require('./index.ts');