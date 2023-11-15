import { colorNames, colorMap, removeColors } from "./colors"
import { borderMacro } from "./macros/borderMacro"
import { marginMacro } from "./macros/marginMacro"
import { paddingMacro } from "./macros/paddingMacro"
import { MacroMap } from "./types"

export const standardMacros: MacroMap = {
  header: {
    match: "header",
    description: "Set header content",
    action: ({ line, state, remove, set }) => {
      remove()
      set({ omit: true })
      state.header = line.cleanLine
    },
  },
  color: {
    match: colorNames,
    options: /(?<noReset>no\-?reset|keep)?/i,
    description: "Set color",
    action: ({ currentLine, match, options, replace }) => {
      const tag = colorMap[match.name as keyof typeof colorMap]
      replace(tag)
      // ensure color reset
      if (!options["noReset"] && !currentLine.output.match(/\x1B\[0m$/)) {
        currentLine.output += colorMap.reset
      }
    },
  },
  borders: borderMacro,
  padding: paddingMacro,
  margin: marginMacro,
  center: {
    match: "center",
    options: /(?<bg>.+)?/,
    description: "Center the content",
    action: ({ line, options, state, remove, setOutput, set }) => {
      remove()
      const bg = options["bg"]?.[0] ?? " "
      const sides = bg[0].repeat(Math.floor((state.maxWidth - line.noColors().length) / 2))
      if (bg.length > 1) {
        set({
          bg: bg,
          paddingChar: bg,
          left: bg[1],
          right: bg[2],
        })
      }
      set({
        bg: bg,
        paddingChar: bg,
        center: true,
        output: sides + line.cleanLine + sides,
      })
    },
  },
  repeat: {
    match: "repeat",
    options: /(?<count>\\d+)?/,
    description: "repeat the content x times (Or the maxWidth)",
    action: ({ line, options, state, remove, setOutput }) => {
      remove()
      const count = options["count"] ? parseInt(options["count"]) : state.maxWidth
      const content = line.trimWithColors().repeat(count)
      setOutput(content)
    },
  },
  separator: {
    match: ["sep", "separator"],
    options: /(?<bg>.+)?/,
    description: `Draw a separator line (Default is defined by "border", but line/lines can be set in body, ex: ┄, ┉, ═, -├┤, ═╞╡) [horizontal or horizontal,left,right]`,
    rawOutput: true,
    action: ({ line, options, state, remove, set, setOutput }) => {
      remove()
      const bg = options["bg"]?.trim()
      const horizental = bg?.[0] ?? state.borders[4]
      const left = bg?.[1] ?? state.borders[6]
      const right = bg?.[2] ?? state.borders[7]
      set({
        bg: horizental,
        left: left,
        right: right,
        paddingChar: horizental,
        center: true,
        output: line.cleanLine,
      })
    },
  },
}
