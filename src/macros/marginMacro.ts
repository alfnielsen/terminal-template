import { Macro } from "../types"

//
export const marginMacro: Macro = {
  match: ["margin", "m"],
  options: /(?<margin>\d+|\d+,\d+|\d+,\d+,\d+,\d+|none)?/,
  description: "Set margin (Follows CSS margin syntax)",
  action: ({ options, state, remove, name }) => {
    remove()
    const margin = (options["margin"] ?? "").trim()
    if (margin === "" || margin === "none") {
      state.margin = [0, 0, 0, 0]
      return
    }
    const marginNumers = margin.split(",").map(x => parseInt(x))
    if (marginNumers.length === 0) {
      state.margin = [0, 0, 0, 0]
      return
    }
    if (marginNumers.length === 1) {
      state.margin = [marginNumers[0], marginNumers[0], marginNumers[0], marginNumers[0]]
      return
    }
    if (marginNumers.length === 2) {
      state.margin = [marginNumers[0], marginNumers[1], marginNumers[0], marginNumers[1]]
      return
    }
    if (marginNumers.length === 4) {
      state.margin = marginNumers
    }
  },
}

function marginFunc(all: number): string
function marginFunc(y: number, x: number): string
function marginFunc(top: number, right: number, bottom: number, left: number): string
function marginFunc(...margins: number[]): string {
  if (margins.length === 1) {
    return `[margin:${margins[0]}]`
  }
  if (margins.length === 2) {
    return `[margin:${margins[0]},${margins[1]}]`
  }
  if (margins.length === 4) {
    return `[margin:${margins[0]},${margins[1]},${margins[2]},${margins[3]}]`
  }
  throw new Error("Invalid margin")
}

const marginMacroMap = {
  none: "[m:0]",
  m1: "[m:1]",
  m2: "[m:2]",
  m3: "[m:3]",
  m4: "[m:4]",
  x1: "[m:0,1]",
  x2: "[m:0,2]",
  x3: "[m:0,3]",
  x4: "[m:0,4]",
  y1: "[m:1,0]",
  y2: "[m:2,0]",
  y3: "[m:3,0]",
  y4: "[m:4,0]",
  t1: "[m:1,0,0,0]",
  t2: "[m:2,0,0,0]",
  t3: "[m:3,0,0,0]",
  t4: "[m:4,0,0,0]",
  r1: "[m:0,1,0,0]",
  r2: "[m:0,2,0,0]",
  r3: "[m:0,3,0,0]",
  r4: "[m:0,4,0,0]",
  b1: "[m:0,0,1,0]",
  b2: "[m:0,0,2,0]",
  b3: "[m:0,0,3,0]",
  b4: "[m:0,0,4,0]",
  l1: "[m:0,0,0,1]",
  l2: "[m:0,0,0,2]",
  l3: "[m:0,0,0,3]",
  l4: "[m:0,0,0,4]",
} as const

export const marginMacroArray = ["[m:0]", "[m:1]", "[m:2]", "[m:3]", "[m:4]"] as const

const margin = Object.assign(marginFunc, marginMacroMap, marginMacroArray) as typeof marginFunc &
  typeof marginMacroMap &
  typeof marginMacroArray

export const marginShortMap = {
  ["m-none"]: "[m:0]",
  ["m-0"]: "[m:0]",
  ["m-1"]: "[m:1]",
  ["m-2"]: "[m:2]",
  ["m-3"]: "[m:3]",
  ["m-4"]: "[m:4]",
  ["mx-1"]: "[m:0,1]",
  ["mx-2"]: "[m:0,2]",
  ["mx-3"]: "[m:0,3]",
  ["mx-4"]: "[m:0,4]",
  ["my-1"]: "[m:1,0]",
  ["my-2"]: "[m:2,0]",
  ["my-3"]: "[m:3,0]",
  ["my-4"]: "[m:4,0]",
  ["mt-1"]: "[m:1,0,0,0]",
  ["mt-2"]: "[m:2,0,0,0]",
  ["mt-3"]: "[m:3,0,0,0]",
  ["mt-4"]: "[m:4,0,0,0]",
  ["mr-1"]: "[m:0,1,0,0]",
  ["mr-2"]: "[m:0,2,0,0]",
  ["mr-3"]: "[m:0,3,0,0]",
  ["mr-4"]: "[m:0,4,0,0]",
  ["mb-1"]: "[m:0,0,1,0]",
  ["mb-2"]: "[m:0,0,2,0]",
  ["mb-3"]: "[m:0,0,3,0]",
  ["mb-4"]: "[m:0,0,4,0]",
  ["ml-1"]: "[m:0,0,0,1]",
  ["ml-2"]: "[m:0,0,0,2]",
  ["ml-3"]: "[m:0,0,0,3]",
  ["ml-4"]: "[m:0,0,0,4]",
} as const

export default margin
