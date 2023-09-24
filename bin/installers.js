import { createSpinner } from "nanospinner"
import { exec } from "child_process"
import fs from "fs"
import {
  addToBuildGradle,
  addToJSON,
  addToPodfile,
  flutterAddToGradle,
  flutterAddToPodfile,
  pubGetSDK,
  androidAddToGradle,
} from "./utils.js"
import chalk from "chalk"

export const androidInstaller = (mid) => {
  const paths = {
    "build.gradle": "./build.gradle",
    "app.build.gradle": "./app/build.gradle",
  }

  const spinner = createSpinner("Setting up your project").start()

  androidAddToGradle(paths, mid)

  // success
  spinner.success({
    text: chalk.greenBright.bold(
      "Your project has been set up and ready to go 🎉"
    ),
  })
}

export const iOSInstaller = () => {}

export const flutterInstaller = (mid) => {
  const spinner = createSpinner("Setting up your project").start()
  const paths = {
    "build.gradle": "./android/build.gradle",
    podfile: "./ios/Podfile",
    merchantConfig: "./ios/MerchantConfig.txt",
  }

  // install hypersdkflutter
  pubGetSDK()
  // add the script to build gradle
  flutterAddToGradle(paths["build.gradle"], mid)
  // check and add the script to pod file
  if (!fs.existsSync(paths["podfile"])) {
    spinner.warn({
      text: chalk.yellowBright.bold(
        "Missing podfile : Looks like the ios build is not initiated yet. Kindly initiate the build and run the juspay-cli again."
      ),
    })
    return
  }
  flutterAddToPodfile(paths["podfile"])
  // add the merchant config file
  fs.writeFileSync(paths["merchantConfig"], `clientId = ${mid}`, (err) =>
    console.log(err)
  )

  // success
  spinner.success({
    text: chalk.greenBright.bold(
      "Your project has been set up and ready to go 🎉"
    ),
  })
}

export const rNativeInstaller = (mid, product) => {
  const paths = {
    "build.gradle": "./android/build.gradle",
    "package.json": "./package.json",
    Podfile: "./ios/Podfile",
    merchantConfig: "./ios/MerchantConfig.txt",
  }
  const spinner = createSpinner("Setting up your project").start()
  const packageName = "hyper-sdk-react"
  addToJSON(paths["package.json"], "hyperSdkIOSVersion", "2.1.23")
  addToBuildGradle(paths["build.gradle"], mid)
  fs.writeFileSync(paths["merchantConfig"], `clientId = ${mid}`, (err) =>
    console.log(err)
  )
  addToPodfile(paths["Podfile"])
  exec(`npm install ${packageName}`, (error) => {
    if (error) {
      spinner.error({ text: `Error: ${error.message}` })
      return
    }
    spinner.success({
      text: chalk.greenBright.bold(
        "Your project has been set up and ready to go 🎉"
      ),
    })
  })
}
