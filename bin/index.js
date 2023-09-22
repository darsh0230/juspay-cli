#!/usr/bin/env node

import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import axios from 'axios'
import { isAndroid, isIOS, isFlutter, isRNative } from './platformChecks.js'
import {
	androidInstaller,
	flutterInstaller,
	iOSInstaller,
	rNativeInstaller,
} from './installers.js'
import { createSpinner } from 'nanospinner'

const sleep = (ms = 100) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
	console.clear()
	const heading = 'Juspay CLI'
	figlet(heading, (err, data) => {
		console.log(gradient.pastel.multiline(data))
	})
	await sleep()
}

async function getPlatform() {
	const spinner = createSpinner('Analyzing the Project...').start()
	let platform
	if (isAndroid()) platform = 'Android'
	else if (isIOS()) platform = 'iOS'
	else if (isFlutter()) platform = 'Flutter'
	else if (isRNative()) platform = 'React Native'
	else platform = ''
	if (platform != '')
		spinner.success({
			text: `${chalk.bold('Detected Project:')} ${chalk.rgb(
				0,
				200,
				200
			)(platform)}`,
		})
	else
		spinner.error({
			text: 'Please run this CLI in the root directory of your project',
		})
	return platform.toLowerCase() == 'react native'
		? 'rnative'
		: platform.toLowerCase()
}

async function askMID() {
	const answers = await inquirer.prompt({
		name: 'MID',
		type: 'input',
		message: 'Enter the Merchant ID:',
		validate: checkMid,
	})
	return answers.MID.toLowerCase()
}

async function checkMid(mid) {
	const url = `https://assets.juspay.in/hyper/bundles/in.juspay.merchants/${mid.toLowerCase()}/${
		platform == 'flutter' || platform == 'rnative' ? 'android' : platform
	}/release/config.json`
	try {
		const res = await axios.get(url)
		if (res.status == 200) return true
	} catch (e) {}
	return chalk.redBright.bold('Sorry, this Merchant ID is not valid')
}

async function askProduct() {
	const answers = await inquirer.prompt({
		name: 'product_select',
		type: 'list',
		message: 'Which Product are you integrating with?',
		choices: ['Hyper Checkout', 'Express Checkout'],
		loop: true,
	})

	return answers.product_select
}

async function install(mid, product) {
	const spinner = createSpinner('Setting up your project...').start()
	switch (platform) {
		case 'android':
			androidInstaller(mid, product)
			break
		case 'ios':
			iOSInstaller(mid, product)
			break
		case 'flutter':
			flutterInstaller(mid, product)
			break
		case 'rnative':
			rNativeInstaller(mid, product)
			break
		default:
			spinner.success({
				text:
					chalk.redBright.bold('Caution: ') +
					'Not in the root directory',
			})
	}
	spinner.success({ text: 'Project set up successfully' })
}

await welcome()
const platform = await getPlatform()
const mid = await askMID()
const product = await askProduct()
await install(mid, product)
