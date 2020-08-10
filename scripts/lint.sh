#!/bin/bash

echo 'Linting SCSS...'
./node_modules/.bin/stylelint 'src/**/*.scss' --config .stylelintrc;

echo 'Linting JavaScript...'
./node_modules/.bin/eslint ./src;
