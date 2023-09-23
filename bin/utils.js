import { exec } from 'child_process'
import fs from 'fs'

export const addToPodfile = (filepath) => {
	const postInstallScript =
		'\t\tfuse_path = "./Pods/HyperSDK/Fuse.rb"\n\t\tclean_assets = false # Pass true to re-download all the assets\n\t\tif File.exist?(fuse_path)\n\t\t\tif system("ruby", fuse_path.to_s, clean_assets.to_s)\n\t\t\tend\n\t\tend\n\tend\nend\n'
	let data = String(fs.readFileSync(filepath))
	if (!data.includes('./Pods/HyperSDK/Fuse.rb')) {
		let enders = 0
		let i = data.length - 1
		for (i = data.length - 1; i >= 0; i--) {
			if (data.slice(i - 3, i) == 'end') enders++
			if (enders == 2) break
		}
		const startData = data.substring(0, i - 3)
		// const endData = data.substring(i - 3, data.length - 1)
		// console.log(startData + '\n\n\nending data\n\n\n' + endData)
		let finalData = ''
		finalData = finalData.concat(startData, postInstallScript)
		fs.writeFileSync(filepath, finalData)
	}
}

export const addToBuildGradle = (filepath, mid) => {
	const extProperty = `\t\tclientId = "${mid}"\n\t\thyperSDKVersion = "2.1.13"\n`
	const mavenUrl =
		'\n\t\tmaven { url "https://maven.juspay.in/jp-build-packages/hyper-sdk/"}\n\t}\n}\n'
	let data = String(fs.readFileSync(filepath))

	// Adding Maven URL
	if (
		!data.includes('https://maven.juspay.in/jp-build-packages/hyper-sdk/')
	) {
		let endingBraces = 0
		let i = 0
		for (i = data.length - 1; i >= 0; i--) {
			if (data[i] == '}') endingBraces++
			if (endingBraces == 3) break
		}
		const dataStart = data.substring(0, i + 1)
		let finalData = ''
		finalData = finalData.concat(dataStart, mavenUrl)
		fs.writeFileSync(filepath, finalData)
	}

	data = String(fs.readFileSync(filepath))

	// Adding ext-property
	if (!data.includes('hyperSDKVersion = "2.1.13')) {
		let endingBraces = 0
		let i = 0
		while (i < data.length) {
			if (data[i] == '}') endingBraces++
			if (endingBraces == 1) break
			i++
		}
		const startData = data.substring(0, i)
		const endData = data.substring(i, data.length - 1)
		let finalData = ''
		finalData = finalData.concat(startData, extProperty, endData)
		fs.writeFileSync(filepath, finalData)
	}

	fs.close(0)
}

export const addToJSON = (filepath, key, value) => {
	const data = fs.readFileSync(filepath)
	var fileData = JSON.parse(data)
	if (fileData.hasOwnProperty(key)) return
	fileData[key] = value
	const finalData = JSON.stringify(fileData, null, 4)
	fs.writeFileSync(filepath, finalData)
	fs.close(0)
}

// flutter installer utils
export function pubGetSDK(){
	exec("flutter pub add hypersdkflutter", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
	});
}