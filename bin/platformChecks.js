import {readdirSync} from "fs";

export const isAndroid = () => {};

export const isIOS = () => {};

export const isFlutter = () => {
  var flag = false;
  readdirSync(".").forEach((file) => {
    if (file === "pubspec.yaml") {
      flag = true;
    }
  })
  return flag;
};

export const isRNative = () => {};
