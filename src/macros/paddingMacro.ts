import { Macro } from "../types"

//
export const paddingMacro: Macro = {
  match: ["padding", "p"],
  options: /(?<padding>\d+|\d+,\d+|\d+,\d+,\d+,\d+|)?/,
  description: "Set padding (Follows CSS padding syntax)",
  action: ({ options, state, remove, name }) => {
    remove()
    const padding = (options["padding"] ?? "").trim()
    if (padding === "" || padding === "none") {
      state.padding = [0, 0, 0, 0]
      return
    }
    const paddingNumers = padding.split(",").map(x => parseInt(x))
    if (paddingNumers.length === 1) {
      state.padding = [paddingNumers[0], paddingNumers[0], paddingNumers[0], paddingNumers[0]]
      return
    }
    if (paddingNumers.length === 2) {
      state.padding = [paddingNumers[0], paddingNumers[1], paddingNumers[0], paddingNumers[1]]
      return
    }
    if (paddingNumers.length === 4) {
      state.padding = paddingNumers
    }
  },
}

function paddingFunc(all: number): string
function paddingFunc(y: number, x: number): string
function paddingFunc(top: number, right: number, bottom: number, left: number): string
function paddingFunc(...borders: number[]): string {
  if (borders.length === 1) {
    return `[padding:${borders[0]}]`
  }
  if (borders.length === 2) {
    return `[padding:${borders[0]},${borders[1]}]`
  }
  if (borders.length === 4) {
    return `[padding:${borders[0]},${borders[1]},${borders[2]},${borders[3]}]`
  }
  throw new Error("Invalid padding")
}

const paddingsMacroMap = {
  none: "[p:0]",
  p1: "[p:1]",
  p2: "[p:2]",
  p3: "[p:3]",
  p4: "[p:4]",
  x1: "[p:0,1]",
  x2: "[p:0,2]",
  x3: "[p:0,3]",
  x4: "[p:0,4]",
  y1: "[p:1,0]",
  y2: "[p:2,0]",
  y3: "[p:3,0]",
  y4: "[p:4,0]",
  t1: "[p:1,0,0,0]",
  t2: "[p:2,0,0,0]",
  t3: "[p:3,0,0,0]",
  t4: "[p:4,0,0,0]",
  r1: "[p:0,1,0,0]",
  r2: "[p:0,2,0,0]",
  r3: "[p:0,3,0,0]",
  r4: "[p:0,4,0,0]",
  b1: "[p:0,0,1,0]",
  b2: "[p:0,0,2,0]",
  b3: "[p:0,0,3,0]",
  b4: "[p:0,0,4,0]",
  l1: "[p:0,0,0,1]",
  l2: "[p:0,0,0,2]",
  l3: "[p:0,0,0,3]",
  l4: "[p:0,0,0,4]",
} as const

export const marginsMacroArray = ["[p:0]", "[p:1]", "[p:2]", "[p:3]", "[p:4]"] as const

const padding = Object.assign(paddingFunc, paddingsMacroMap) as typeof paddingFunc & typeof paddingsMacroMap

export const paddingShortMap = {
  ["p-none"]: "[p:0]",
  ["p0"]: "[p:0]",
  ["p1"]: "[p:1]",
  ["p2"]: "[p:2]",
  ["p3"]: "[p:3]",
  ["p4"]: "[p:4]",
  ["px-1"]: "[p:0,1]",
  ["px-2"]: "[p:0,2]",
  ["px-3"]: "[p:0,3]",
  ["px-4"]: "[p:0,4]",
  ["py-1"]: "[p:1,0]",
  ["py-2"]: "[p:2,0]",
  ["py-3"]: "[p:3,0]",
  ["py-4"]: "[p:4,0]",
  ["pt-1"]: "[p:1,0,0,0]",
  ["pt-2"]: "[p:2,0,0,0]",
  ["pt-3"]: "[p:3,0,0,0]",
  ["pt-4"]: "[p:4,0,0,0]",
  ["pr-1"]: "[p:0,1,0,0]",
  ["pr-2"]: "[p:0,2,0,0]",
  ["pr-3"]: "[p:0,3,0,0]",
  ["pr-4"]: "[p:0,4,0,0]",
  ["pb-1"]: "[p:0,0,1,0]",
  ["pb-2"]: "[p:0,0,2,0]",
  ["pb-3"]: "[p:0,0,3,0]",
  ["pb-4"]: "[p:0,0,4,0]",
  ["pl-1"]: "[p:0,0,0,1]",
  ["pl-2"]: "[p:0,0,0,2]",
  ["pl-3"]: "[p:0,0,0,3]",
  ["pl-4"]: "[p:0,0,0,4]",
} as const

export default padding
