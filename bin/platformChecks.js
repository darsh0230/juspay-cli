import { readdirSync } from 'fs'

export const isAndroid = () => {
	var flag = false
	readdirSync('.').forEach((file) => {
		if (file === 'build.gradle') {
			flag = true
		}
	})
	return flag
}

export const isIOS = () => {
	var flag = false
	readdirSync('.').forEach((file) => {
		if (file === 'Podfile') {
			flag = true
		}
	})
	return flag
}

export const isFlutter = () => {
	var flag = false
	readdirSync('.').forEach((file) => {
		if (file === 'pubspec.yaml') {
			flag = true
		}
	})
	return flag
}

export const isRNative = () => {
	var flag = false
	readdirSync('.').forEach((file) => {
		if (file === 'package.json') {
			flag = true
		}
	})
	return flag
}
