#!/usr/bin/env node

const docgen = require('@axonteam/doc-gen');

const paths = require('./docpaths.json');

docgen.generate(`${__dirname}/../src/`, `${__dirname}/../docs/`, paths);
