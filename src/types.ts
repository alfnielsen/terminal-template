export type DefaultState = {
  macroMatcher: RegExp
  borders: string[]
  lineBase: boolean
}

export type TemplateState = {
  macroMatcher: RegExp
  borders: string[]
  lineBase: boolean
  macros: MacroMap
}

export type GlobalTemplateOptions = {
  macroMatcher: RegExp
  borders: string | string[]
  lineBase: boolean
  macros: MacroMap
}

export type TemplateFunction = (template: TemplateStringsArray | string, ...substitutions: any[]) => string
export type MacroActionOptions = {
  line: ContentObject
  currentLine: ParserLineState
  /** macro matches (Raw Input lines can be found on macthers.input) */
  state: ParserState
  match: MacroMatch
  name: string
  options: Record<string, string>
  rawOptions: string
  lineMacthes: MacroMatch[]
  optionMatch?: RegExpMatchArray | null
  start: number
  end: number
  // methods
  replace: (newContent: string) => void
  remove: () => void
  prepend: (newContent: string) => void
  append: (newContent: string) => void
  setOutput: (newContent: string) => void
  set: (opt: Partial<ParserLineState>) => void
}

export type MacroName = string
export type MacroOptionName = string
export type MacroOptionValue = string | number | boolean

export type ContentObject = {
  /** Original input including template macros */
  content: string
  /** Original input with all macros removed */
  cleanLine: string
  /** content with all colors removed */
  noColors: () => string
  /** content with all colors removed and trimmed */
  trimNoColor: () => string
  /** content trimmed (with colors) */
  trimWithColors: () => string
}

export type MacroMatch = {
  name: string
  options: string
  content: string
  match: RegExpExecArray
  start: number
  end: number
  macro: Macro
}
export type MacroAction = (options: MacroActionOptions) => void
export type Macro = {
  name?: string
  description?: string
  match: string | RegExp | (string | RegExp)[]
  options?: RegExp
  action: MacroAction
  rawOutput?: boolean
}
export type ParserState = {
  header?: string
  top?: string
  bottom?: string
  maxWidth: number
  borders: string[]
  padding: number[]
  margin: number[]
  macros: Macro[]
  content: string
  lines: string[]
  lineStates: ParserLineState[]
  currentLine: ParserLineState
}
export type ParserLineState = {
  raw: string
  noMacro: string
  removed: number
  output: string
  omit?: boolean
  bg?: string
  left?: string
  right?: string
  center?: boolean
  padding?: number[]
  paddingChar?: string
}

export type MacroMap = Record<string, Macro>
