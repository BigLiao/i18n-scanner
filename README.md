# i18n-scanner

Automatic extract i18n locale files by scan your code.<br >
通过扫描代码自动提取 i18n 翻译文件。

Source code
```js
export default function () {
  const text1 = $t('我爱写代码。');
  const text2 = $t('I like coding very much.');
  const text3 = $t('_good');
  return text1 + text2 + text3;
}
```
Changed code
```js
export default function () {
  const text1 = $t('_bca79288c219');
  const text2 = $t('_990ce733961c');
  const text3 = $t('_good');
  return text1 + text2 + text3;
}
```
Extracted i18n file
```json
{
    "_bca79288c219": "我爱写代码。",
    "_990ce733961c": "I like coding very much."
}
```

## Installation

```sh
npm install --save-dev i18next-scanner
```

or

```sh
npm install -g i18next-scanner
```

## Usage

Matching code like `$t('login')`, so the text need to be extracted must wrote in this format.<br>
匹配字符串的标识为 `$t('登录')` ，所以需要翻译的内容需要用这种格式。

Texts started with a dash will not be matched, like `$t('_login')`.<br>
以下划线 `_` 开头的字符不会被匹配，例如 `$t('_登录')`。

### CLI Usage

```sh
$ i18n-scanner --help
  Usage: cli -i <source dir> -o <i18n dir>

  Options:
    -V, --version         output the version number
    -i --input [input]    path of source code
    -o --output [output]  path for place i18n data
    -h, --help            output usage information
```

Use `i18n-scanner` command and follow the tips.<br>
在代码目录使用命令 `i18n-scanner` ，按照提示操作即可。

## Notice
This command will change source code, please save and commit your code first.<br>
命令会改变源代码，为防止意外导致代码错误，请在使用命令前先保存并提交代码。