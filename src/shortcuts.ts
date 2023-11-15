import { print } from "./compile"
import { colorMap } from "./colors"
import border, { borderShortMap } from "./macros/borderMacro"
import margin, { marginShortMap } from "./macros/marginMacro"
import padding, { paddingShortMap } from "./macros/paddingMacro"

// add "$" with all relevant properties

const seetings = {
  b: border,
  border: border,
  ...borderShortMap,
  m: margin,
  margin: margin,
  ...marginShortMap,
  p: padding,
  padding: padding,
  ...paddingShortMap,
}

const set = (opt: typeof seetings) => {
  const macros = Object.values(opt).join("")
  return {
    print: (content: string) => print(macros + "\n" + content),
  }
}
const settings = set

const $ = {
  set,
  settings,
  print,
  log: print,
  ...colorMap,
  color: colorMap,
  b: border,
  border: border,
  ...borderShortMap,
  m: margin,
  margin: margin,
  ...marginShortMap,
  p: padding,
  padding: padding,
  ...paddingShortMap,
}

export default $
