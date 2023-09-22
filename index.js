#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'

const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms))

let mid

async function welcome() {
	const heading = 'Juspay CLI'
	figlet(heading, (err, data) => {
		console.log(gradient.pastel.multiline(data))
	})
	await sleep()
}

async function askMID() {
	const answers = await inquirer.prompt({
		name: 'MID',
		type: 'input',
		message: 'What is you MID?',
	})

	mid = answers.MID
}

await welcome()
await askMID()
