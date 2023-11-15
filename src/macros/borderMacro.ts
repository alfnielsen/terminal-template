import { Obj } from "ts-type-helper"
import {
  borderNone,
  boxLines,
  crossesBorderOnly,
  dashedBoxLines,
  dottedBoxLines,
  doubleBoxLines,
  horizontalBorderOnly,
  roundedBoxLines,
  thickBoxLines,
  thickerBoxLines,
  verticalBorderOnly,
} from "../lines"
import { Macro } from "../types"

//
export const borderMacro: Macro = {
  match: ["border", "b"],
  options: /(?<borders>.+)?/,
  description:
    "Set borders chars (╭╮╰╯─│├┤┬┴┼) [top-left, top-right, bottom-left, bottom-right, vertical, norisontal, left-cross, right-cross, top-cross, bottom-cross, cross]",
  action: ({ state, remove, options, name }) => {
    remove()
    const borders = (options["borders"] ?? "").trim()
    if (borders === "") {
      state.borders = [...boxLines]
      return
    }
    //console.log(borders)
    const borderArr = borderTypeMatchers.find(x => x.match.test(borders))
    if (borderArr) {
      state.borders = [...borderArr.arr]
      return
    }
    state.borders = borders.split("")
  },
}

type BorderFuncProps = {
  topLeft?: string
  topRight?: string
  bottomLeft?: string
  leftRight?: string
  vertival?: string
  horizontal?: string
  crossLeft?: string
  crossRight?: string
  crossTop?: string
  crossBottom?: string
  cross?: string
}

function borderFunc(noBorder: boolean): string
function borderFunc(border: string): string
function borderFunc(rounded: true): string
function borderFunc(noBorder: boolean): string
function borderFunc(opt: BorderFuncProps): string
function borderFunc(border: string | BorderFuncProps | boolean): string {
  if (border === true) {
    return `[b:1]`
  }
  if (border === false) {
    return `[b:none]`
  }
  if (typeof border === "string") {
    // TODO: specify type with union
    return `[b:${border}]`
  }

  const {
    topLeft = "╭",
    topRight = "╮",
    bottomLeft = "╰",
    leftRight = "╯",
    vertival = "─",
    horizontal = "│",
    crossLeft = "├",
    crossRight = "┤",
    crossTop = "┬",
    crossBottom = "┴",
    cross = "┼",
  } = border
  return `[b:${topLeft},${topRight},${bottomLeft},${leftRight},${vertival},${horizontal},${crossLeft},${crossRight},${crossTop},${crossBottom},${cross}]`
}

type BorderTypes =
  | "none"
  | "box"
  | "rounded"
  | "double"
  | "dotted"
  | "dashed"
  | "thick"
  | "thicker"
  | "vertical"
  | "horizontal"
  | "cross"
type BorderTypeMapType = Record<BorderTypes, any>

const borderTypeRegExpMap = {
  none: /none|false|off|no/,
  box: /true|on|yes|default|box|square|normal|edge|edges/,
  rounded: /rounded|round/,
  double: /double/,
  dotted: /dotted/,
  dashed: /dashed/,
  thick: /thick/,
  thicker: /thicker/,
  vertical: /v|vertical|column|col|left-right/,
  horizontal: /h|horizontal|row|top-bottom/,
  cross: /cross|crosses|no-edge/,
} as const satisfies BorderTypeMapType

const borderLineArrayMap = {
  none: borderNone,
  box: boxLines,
  rounded: roundedBoxLines,
  double: doubleBoxLines,
  dotted: dottedBoxLines,
  dashed: dashedBoxLines,
  thick: thickBoxLines,
  thicker: thickerBoxLines,
  vertical: verticalBorderOnly,
  horizontal: horizontalBorderOnly,
  cross: crossesBorderOnly,
} as const satisfies BorderTypeMapType

const borderTypeMatchers = Obj(borderTypeRegExpMap).map((k, v) => {
  return {
    name: k,
    match: borderTypeRegExpMap[k as BorderTypes],
    arr: borderLineArrayMap[k as BorderTypes],
  }
})

const borderMacroMap = {
  none: "[b:none]",
  box: "[b:rounded]",
  rounded: "[b:rounded]",
  double: "[b:double]",
  dotted: "[b:dotted]",
  dashed: "[b:dashed]",
  thick: "[b:thick]",
  thicker: "[b:thicker]",
  vertical: "[b:vertical]",
  horizontal: "[b:horizontal]",
  cross: "[b:cross]",
} as const satisfies BorderTypeMapType

// All helper map (Final mapping)
const borders = Object.assign(borderFunc, borderMacroMap) as typeof borderFunc & typeof borderMacroMap

export const borderShortMap = {
  ["b-none"]: "[b:none]",
  ["b-box"]: "[b:box]",
  ["b-rounded"]: "[b:rounded]",
  ["b-double"]: "[b:double]",
  ["b-dotted"]: "[b:dotted]",
  ["b-dashed"]: "[b:dashed]",
  ["b-thick"]: "[b:thick]",
  ["b-thicker"]: "[b:thicker]",
  ["b-vertical"]: "[b:vertical]",
  ["b-horizontal"]: "[b:horizontal]",
  ["b-cross"]: "[b:cross]",
  // full name
  ["border-none"]: "[b:none]",
  ["border-box"]: "[b:box]",
  ["border-rounded"]: "[b:rounded]",
  ["border-double"]: "[b:double]",
  ["border-dotted"]: "[b:dotted]",
  ["border-dashed"]: "[b:dashed]",
  ["border-thick"]: "[b:thick]",
  ["border-thicker"]: "[b:thicker]",
  ["border-vertical"]: "[b:vertical]",
  ["border-horizontal"]: "[b:horizontal]",
  ["border-cross"]: "[b:cross]",
} as const

export default borders
