#!/usr/bin/env node
const package = require('../package.json');
const program = require('commander');
const inquirer = require('inquirer');

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
    message: 'This command will change your source code, make sure you have commit your code!\n  此命令会改变你的源代码，请确保在操作前保存并提交你的代码！',
    choices: [
      {
        name: 'Ok, I have commit my code.\n 没问题，我已经提交过代码了。',
        value: true
      }, {
        name: 'Not yet, I will commit first.\n 我还没提交代码！',
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
        name: 'input',
        message: 'path of source code: ',
        validate: function (input) {
          if (!input) {
            return 'can not be empty';
          }
          return true;
        }
      });
    }
  
    if (!config.output) {
      prompts.push({
        type: 'input',
        name: 'output',
        message: 'path for place i18n data: ',
        validate: function (input) {
          if (!input) {
            return 'can not be empty';
          }
          return true;
        }
      });
    }

    inquirer.prompt(prompts).then(answers => {
      
    })
  });
  

  
  
  // promps.push({
  //   type: 'input',
  //   name: 'input',
  //   message: 'input the path of source code',
  //   validate: function (input) {
  //     if (!input) {
  //       return 'can not be empty';
  //     }
  //     return true;
  //   }
  // });
  // promps.push({
  //   type: 'list',
  //   name: 'cssPretreatment',
  //   message: '想用什么css预处理器呢',
  //   choices: [
  //     {
  //       name: 'Sass/Compass',
  //       value: 'sass'
  //     },
  //     {
  //       name: 'Less',
  //       value: 'less'
  //     }
  //   ]
  // })
  // inquirer.prompt(promps).then(function (answers) {
  //   console.log(answers)
  // });
}