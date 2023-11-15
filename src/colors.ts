import { Obj } from "ts-type-helper"

export const colorMap = {
  bold: "\x1B[1m",
  dim: "\x1B[2m",
  underline: "\x1B[4m",
  /** Not widely supported! */
  blink: "\x1B[5m",
  invert: "\x1B[7m",
  invisible: "\x1B[8m",

  reset: "\x1B[0m",
  //noBold: '\x1B[21m', (broken)
  noDim: "\x1B[22m",
  noUnderline: "\x1B[24m",
  noBlink: "\x1B[25m",
  noInvert: "\x1B[27m",
  visible: "\x1B[28m",
  // colors:
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  purple: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  gray: "\x1B[90m", // alias for bright black
  blackBright: "\x1B[90m",
  redBright: "\x1B[91m",
  greenBright: "\x1B[92m",
  yellowBright: "\x1B[93m",
  blueBright: "\x1B[94m",
  purpleBright: "\x1B[95m",
  cyanBright: "\x1B[96m",
  whiteBright: "\x1B[97m",
  // bgColors:
  bgBlack: "\x1B[40m",
  bgRed: "\x1B[41m",
  bgGreen: "\x1B[42m",
  bgYellow: "\x1B[43m",
  bgBlue: "\x1B[44m",
  bgPurple: "\x1B[45m",
  bgCyan: "\x1B[46m",
  bgWhite: "\x1B[47m",
  bgGray: "\x1B[100m", // alias for bright black
  bgBlackBright: "\x1B[100m",
  bgRedBright: "\x1B[101m",
  bgGreenBright: "\x1B[102m",
  bgYellowBright: "\x1B[103m",
  bgBlueBright: "\x1B[104m",
  bgPurpleBright: "\x1B[105m",
  bgCyanBright: "\x1B[106m",
  bgWhiteBright: "\x1B[107m",
} as const

export const colorNames = Object.keys(colorMap)

export const colorTagMatcher = /(\x1B\[\d+m)/g

export type FontStyleType = keyof typeof colorMap
type FontStyleFunction = (strings: TemplateStringsArray | string, ...substitutions: any[]) => string
type FontStyleFunctionMap = {
  [key in FontStyleType]: FontStyleFunction
}

export const colors = Obj(colorMap).reduceObj<FontStyleFunctionMap>((acc, key, colorTag) => {
  acc[key] = (strings: TemplateStringsArray | string, ...substitutions: any[]) => {
    return `${colorTag}${String.raw({ raw: strings }, ...substitutions)}${colorMap.reset}`
  }
  return acc
})

export const removeColors = (str: string) => {
  return str.replace(colorTagMatcher, "")
}

export const replaceColorCodeWithName = (str: string, addBefore?: string, addAfter?: string) => {
  let match = colorTagMatcher.exec(str)
  while (match) {
    const colorCode = match[0]
    const name = Object.keys(colorMap).find(x => colorMap[x as keyof typeof colorMap] === colorCode)
    if (name) {
      str = str.replace(colorCode, `${addBefore || ""}${name}${addAfter || ""}`)
    }
    match = colorTagMatcher.exec(str)
  }
  return str.replace(colorTagMatcher, "")
}

export default colors
