import $, { colorMap, removeColors, replaceColorCodeWithName } from "./colors"
import { Obj } from "ts-type-helper"
import { standardMacros } from "./standardMacros"
import {
  DefaultState,
  GlobalTemplateOptions,
  Macro,
  MacroActionOptions,
  MacroMap,
  MacroMatch,
  ParserLineState,
  ParserState,
  TemplateState,
} from "./types"

const defaultState: DefaultState = {
  macroMatcher: /(?<!\[)\[(?<name>\w+)(?::?(?<options>[^\]]+))?\]/g,
  borders: ["╭", "╮", "╰", "╯", "─", "│", "├", "┤", "┬", "┴", "┼"],
  lineBase: true,
}

const cloneRegex = (input: RegExp) => new RegExp(input.source, input.flags)

function* macroIterator(content: string, macroMatcher = cloneRegex(defaultState.macroMatcher)) {
  let match = macroMatcher.exec(content)
  while (match && match.groups) {
    //console.log("match", match.groups, match.index)
    yield {
      name: match.groups.name,
      options: match.groups.options,
      content: content.slice(match.index, match.index + match[0].length),
      match,
      start: match.index,
      end: match.index + match[0].length,
    } as MacroMatch
    match = macroMatcher.exec(content)
  }
}

export const print = (strings: TemplateStringsArray | string, ...substitutions: any[]) => {
  // pre compile to template:
  // replace color with template color name
  const subs = substitutions.map(x => {
    x = replaceColorCodeWithName(x, "[", "]")
    return x
  })

  const output = String.raw({ raw: strings }, ...subs)
  // console.log("RAW")
  // console.log(String.raw({ raw: strings }, ...subs))
  // console.log("COMPILED")
  const c = compile(output)
  console.log(c)
}

/**
 * Compile a temaplte to terminal formatted string
 *
 * Example:
 * ```
 * const template = `[border:╭╮╰╯─│├┤] [header:My header]
 *
 * [yellow]Usage:
 *
 * [cyan]npm run [command]     [gray][options?]
 * `
 * const output = compile(template)
 * console.log(output)
 * ```
 *
 * Use extendMacros(CustomMacrosMap) to add custom macros, for custom functionality.
 * ```
 *  const output = compile(template, extendMacros(customMacrosMap))
 *  console.log(output)
 * ```
 *
 */
export const compile = (content: string, options?: GlobalTemplateOptions, macros: MacroMap = standardMacros) => {
  const opt = parseTemplateOptions(options ?? {})
  const state: ParserState = {
    borders: opt.borders,
    macros: Obj(macros).map((name, macro) => {
      macro.name = name
      return macro
    }),
    content,
    lines: content.split("\n"),
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    header: undefined,
    maxWidth: 0,
    top: "",
    bottom: "",
    currentLine: undefined!,
    lineStates: [],
  }
  state.maxWidth = state.lines.reduce((acc, line) => Math.max(acc, removeColors(line).length), 0)

  state.lines.forEach((line, index) => {
    // console.log($.blue`line`, line)
    const lineMacroMacthes: MacroMatch[] = matchMacros(line, state)

    let noMacro = line.replace(opt.macroMatcher, "")

    state.currentLine = {
      raw: line,
      output: line,
      noMacro,
      removed: 0,
    }
    // console.log($.blue`MACROS:`, colorMap.bgBlue, lineMacroMacthes.map(x => x.name).join(","), colorMap.reset)

    lineMacroMacthes.forEach(match => {
      const macro = match.macro
      const currentLine = state.currentLine
      const optionMatch = match.options ? macro.options?.exec(match.options) : undefined
      // console.log($.bgPurple`optionMatch : groups:`, optionMatch?.groups, "OptionsInput", match.options)
      const start = match.start - currentLine.removed
      const end = match.end - currentLine.removed
      const replace = (replace: string) => {
        currentLine.output = currentLine.output.slice(0, start) + replace + currentLine.output.slice(end)
        currentLine.removed += end - start - replace.length
      }
      const remove = () => {
        replace("")
      }
      const prepend = (prepend: string) => {
        currentLine.output = prepend + currentLine.output
      }
      const append = (append: string) => {
        currentLine.output = currentLine.output + append
      }
      const setOutput = (output: string) => {
        currentLine.output = output
      }

      const set = (opt: Partial<ParserLineState>) => {
        Object.assign(currentLine, opt)
      }

      const options: MacroActionOptions = {
        // state
        state,
        line: {
          content: line,
          cleanLine: noMacro,
          noColors: () => removeColors(noMacro),
          trimNoColor: () => removeColors(noMacro).trim(),
          trimWithColors: () => noMacro.trim(),
        },
        currentLine,
        match,
        name: match.name,
        rawOptions: match.options,
        optionMatch: optionMatch,
        options: optionMatch?.groups ?? {},
        lineMacthes: lineMacroMacthes,
        start,
        end,
        // methods
        replace,
        remove,
        prepend,
        append,
        setOutput,
        set,
      }
      macro.action(options)
      // console.log($.green`mathcer-output`, macro.name, "::", options.currentLine.output)
    })
    state.lineStates.push(state.currentLine)
  })
  const b = state.borders
  const m = state.margin.map(x => " ".repeat(x))
  let output = ""

  const addLine = (line: ParserLineState) => {
    const { bg = " ", left = b[5], right = b[5], center, output, padding = state.padding, paddingChar = " " } = line
    const p = padding.map(x => paddingChar.repeat(x))
    if (output === "") {
      const spaces = bg.repeat(state.maxWidth)
      return m[0] + left + p[0] + spaces + p[1] + right + m[2]
    }
    const spaceCount = state.maxWidth - removeColors(output).length
    if (center) {
      const side1 = bg.repeat(Math.floor(spaceCount / 2))
      const side2 = side1 + (spaceCount % 2 === 0 ? "" : bg)
      return m[0] + left + p[0] + side1 + output + side2 + p[1] + right + m[2]
    }
    const spaces = bg.repeat(spaceCount)
    return m[0] + left + p[0] + output + spaces + p[1] + right + m[2]
  }

  if (state.top) {
    output += state.top + "\n"
  } else {
    output +=
      addLine({
        output: state.header ?? "",
        center: true,
        bg: b[4],
        left: b[0],
        right: b[1],
        paddingChar: b[4],
        noMacro: state.header ?? "",
        raw: state.header ?? "",
        removed: 0,
      }) + "\n"
  }
  output += state.lineStates
    .filter(x => !x.omit)
    .map(x => addLine(x))
    .join("\n")

  if (state.bottom) {
    output += "\n" + state.bottom
  } else {
    output += "\n"
    output += addLine({
      output: "",
      center: true,
      bg: b[4],
      left: b[2],
      right: b[3],
      paddingChar: b[4],
      noMacro: "",
      raw: "",
      removed: 0,
    })
  }

  return output
}

/** Wet the RegExp used to match template macros
 * - The RexExp must have a "name" and "options" group to work!
 * - The RegExp must be global (g flag) if nultiple macros a re expected in the same line
 * Default: /(?<!\[)[(?<name>\w+)(?:\((?<options>.*)\))?}]/g
 * Example of use: [center] Im im a header
 *
 * Custom example change to use {{ }} instead of []}:
 * ```
 * setTemplateMatcher(/(?<!\{)\{\{(?<name>\w+)(?:\((?<options>.*)\))?\}\}/g)
 * ```
 *
 * @param templateMacro
 */
export const setTemplateOptions = (opt: Partial<GlobalTemplateOptions>) => {
  const state = parseTemplateOptions(opt)
  Obj(defaultState).override(state)
}

const parseTemplateOptions = (opt: Partial<GlobalTemplateOptions>) => {
  const { borders, ...rest } = opt
  const state: TemplateState = {
    ...rest,
    borders: typeof borders === "string" ? borders.split("") : defaultState.borders,
    lineBase: opt.lineBase ?? defaultState.lineBase,
    macroMatcher: opt.macroMatcher ?? defaultState.macroMatcher,
    macros: opt.macros ?? standardMacros,
  }
  return state
}

const findMacro = (name: string, macros: Macro[]) => {
  const macro = macros.find(x => {
    if (typeof x.match === "string") {
      return x.match === name
    }
    if (x.match instanceof RegExp) {
      return x.match.exec(name)
    }
    if (Array.isArray(x.match)) {
      return x.match.some(y => {
        if (typeof y === "string") {
          return y === name
        }
        if (y instanceof RegExp) {
          return y.exec(name)
        }
        return false
      })
    }
    return false
  })
  return macro
}

export const extendMacros = (extendMap: MacroMap) => {
  return Object.assign(standardMacros, extendMap)
}

function matchMacros(line: string, state: ParserState) {
  const lineMacroMacthes: MacroMatch[] = []
  for (let macroMatch of macroIterator(line)) {
    const macro = findMacro(macroMatch.name, state.macros)
    if (!macro) {
      continue
    }
    macroMatch.macro = macro
    lineMacroMacthes.push(macroMatch)
  }
  return lineMacroMacthes
}
