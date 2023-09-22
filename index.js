#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'

const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms))

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

async function getPlatform() {
	// Android
	return 'android'
	// iOS
	return 'ios'
	// Flutter
	return 'flutter'
	// React Native
	return 'rnative'
}

async function install(platform) {
	switch (platform) {
		case 'android':
			console.log('Android')
			break
		case 'ios':
			console.log('iOS')
			break
		case 'flutter':
			console.log('Flutter')
			break
		case 'rnative':
			console.log('React Native')
			break
		default:
			console.log('Please try in root directory')
	}
}

await welcome()
const mid = await askMID()
const product = await askProduct()
const platform = await getPlatform()
await install(platform)
