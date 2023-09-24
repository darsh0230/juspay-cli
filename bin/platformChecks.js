import { readFileSync, existsSync } from "fs"

export const isAndroid = () => {
  if (existsSync("build.gradle")) {
    return true
  }
  return false
}

export const isIOS = () => {
  if (existsSync("Podfile")) {
    return true
  }
  return false
}

export const isFlutter = () => {
  if (existsSync("pubspec.yaml")) {
    return true
  }
  return false
}

export const isRNative = () => {
  if (
    existsSync("package.json") &&
    String(readFileSync("package.json")).includes("react-native")
  ) {
    return true
  }
  return false
}
