#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();
program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    console.log(firstConfig, secondConfig, options.format);
  });
program.parse(process.argv);
