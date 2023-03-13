const { program } = require('commander')
const chalk = require('chalk')

// console.log(`${chalk.blue('hello')}, ${chalk.red('this')} ${chalk.underline('is')} ${chalk.bgRed('chalk')}!`);

// 名称，描述，版本号，用法提示。
// program
// 	.name('cli')
// 	.description('这是一个神奇的脚手架')
// 	.version('0.0.1')
// 	.usage('<command> [options]')

// // createPage 命令
// program.command('createPage')
// 	.description('生成一个页面') // 命令描述
// 	.argument('<name>', '文件名字') // <name> 表 name 为必填
// 	.action((name) => { // 输入该命令的动作，逻辑实现。
// 		console.log(`新建了一个文件：${name}`)
// 	})

// program.parse() // 解析

const inquirer = require('inquirer')

const arr = [
	{
		type: 'input',
		name: 'projectName',
		message: '项目名称',
		default: 'vue-demo',
	},
	{
		type: 'list',
		name: 'projectType',
		message: '项目类型',
		default: 'vue2',
		choices: [
			{ name: 'vue2', value: 'vue2' },
			{ name: 'vue3', value: 'vue3' },
			{ name: 'react', value: 'react' }
		]
	},
	{
		type: 'checkbox',
		name: 'plugins',
		message: '插件选择',
		choices: [
			{ name: 'babel', value: 'babel' },
			{ name: 'eslint', value: 'eslint' },
			{ name: 'vue-router', value: 'vue-router' }
		]
	},
	{
		type: 'confirm',
		name: 'confirm',
		message: 'confirm',
	}
]

inquirer.prompt(arr).then(answers => {
	console.log('==============')
	console.log(answers)
}).catch(error => {
	console.log('--------------')
	console.log(error)
})
