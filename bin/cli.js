#!/usr/bin/env node
const fs = require('fs');
const package = require('../package.json');
const program = require('commander');
const inquirer = require('inquirer');
const scan = require('../lib/index');

program
  .version(package.version)
  .usage('-i <input dir> -o <output dir>')
  .option('-i --input [input]', 'path of source code')
  .option('-o --output [output]', 'path for place i18n data')
  .option('-l --lang [lang]', 'default language')
  .action(options => {
    handlerAction(options)
  })

program.parse(process.argv);

function handlerAction(options) {
  const config = {
    input: options.input,
    output: options.output,
    defaultLang: options.lang
  };
  inquirer.prompt({
    type: 'list',
    name: 'haveSavedCode',
    message: 'This command will change your source code, make sure you have committed\n  此命令会改变你的源代码，操作前先保提交代码！',
    choices: [
      {
        name: 'Ok, I have commit my code. (没问题，我已经提交过代码了)',
        value: true
      }, {
        name: 'Cancel operation. (取消操作)',
        value: false
      }
    ]
  }).then(answers => {
    if (!answers.haveSavedCode) {
      process.exit();
    }
    const prompts = [];
    if (!config.input) {
      prompts.push({
        type: 'input',
        name: 'inputDir',
        message: 'Source code directory (源代码目录): ',
        default: './src',
        validate: function (input) {
          if (!input) {
            return 'Can not be empty!';
          }
          try {
            fs.accessSync(input);
            return true;         
          } catch (error) {
            return 'Directory does not exist';
          }
        }
      });
    }
  
    if (!config.output) {
      prompts.push({
        type: 'input',
        name: 'outputDir',
        default: './locale/lang',
        message: 'Target directory to place i18n files (放置 i18n 文件的目录): ',
        validate: function (input) {
          if (!input) {
            return 'Can not be empty!';
          }
          try {
            fs.accessSync(input);
            return true;     
          } catch {
            try {
              fs.mkdirSync(input, { recursive: true });
              return true;
            } catch {
              return 'mkdir failed';
            }
          }
        }
      });
    }

    inquirer.prompt(prompts).then(answers => {
      if (answers.inputDir) {
        config.input = answers.inputDir;
      }
      if (answers.outputDir) {
        config.output = answers.outputDir;
      }
      scan(config.input, config.output);
    })
  });
  
}