import { createSpinner } from 'nanospinner'
import { exec } from 'child_process'
import fs from 'fs'
import { addToBuildGradle, addToJSON, addToPodfile } from './utils.js'
import chalk from 'chalk'

export const androidInstaller = () => {
	const paths = {
		'build.gradle': './android/build.gradle',
	}
}

export const iOSInstaller = () => {}

export const flutterInstaller = () => {}

export const rNativeInstaller = (mid, product) => {
	const paths = {
		'build.gradle': './android/build.gradle',
		'package.json': './package.json',
		Podfile: './ios/Podfile',
		merchantConfig: './ios/MerchantConfig.txt',
	}
	const spinner = createSpinner('Setting up your project').start()
	const packageName = 'hyper-sdk-react'
	addToJSON(paths['package.json'], 'hyperSdkIOSVersion', '2.1.23')
	addToBuildGradle(paths['build.gradle'], mid)
	fs.writeFileSync(paths['merchantConfig'], `clientId = ${mid}`, (err) =>
		console.log(err)
	)
	addToPodfile(paths['Podfile'])
	exec(`npm install ${packageName}`, (error) => {
		if (error) {
			spinner.error({ text: `Error: ${error.message}` })
			return
		}
		spinner.success({
			text: chalk.greenBright.bold(
				'Your project has been set up and ready to go 🎉'
			),
		})
	})
}
