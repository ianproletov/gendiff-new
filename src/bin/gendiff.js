#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '..';

const program = new Command();
program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const [first, second] = gendiff(firstConfig, secondConfig, options.format);
    console.log(first);
    console.log(second);
  });
program.parse(process.argv);
