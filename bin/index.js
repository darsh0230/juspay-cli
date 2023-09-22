#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { isAndroid, isIOS, isFlutter, isRNative } from './platformChecks.js'

const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms))

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

	return answers.MID
}

async function askProduct() {
	const answers = await inquirer.prompt({
		name: 'product_select',
		type: 'list',
		message: 'Which Product are you integrating with?',
		choices: [
			'Hyper Checkout',
			'Express Checkout SDK',
			'Express Checkout API (Web)',
		],
	})

	return answers.product_select
}

async function install() {
	if (isAndroid()) return 'android'
	else if (isIOS()) return 'ios'
	else if (isFlutter()) return 'flutter'
	else if (isRNative()) return 'rnative'
	else return "You're not in the root directory of your project"
}

await welcome()
const mid = await askMID()
const product = await askProduct()
const platform = await install()
