#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'

console.log(chalk.bgGreen('Hello from Juspay'))

let mid

async function askMID() {
	const answers = await inquirer.prompt({
		name: 'MID',
		type: 'input',
		message: 'What is you MID?',
	})

	mid = answers.MID
}

await askMID()
