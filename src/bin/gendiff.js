#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '..';

const program = new Command();
program
  .version('0.2.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const diff = gendiff(firstConfig, secondConfig, options.format);
    console.log(diff);
  });
program.parse(process.argv);
