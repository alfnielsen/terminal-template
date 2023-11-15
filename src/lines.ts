//https://en.wikipedia.org/wiki/Box-drawing_character#Unix,_CP/M,_BBS

export const unicodeLines = [
  ["─", "━", "│", "┃", "┄", "┅", "┆", "┇", "┈", "┉", "┊", "┋", "┌", "┍", "┎", "┏"],
  ["┐", "┑", "┒", "┓", "└", "┕", "┖", "┗", "┘", "┙", "┚", "┛", "├", "┝", "┞", "┟"],
  ["┠", "┡", "┢", "┣", "┤", "┥", "┦", "┧", "┨", "┩", "┪", "┫", "┬", "┭", "┮", "┯"],
  ["┰", "┱", "┲", "┳", "┴", "┵", "┶", "┷", "┸", "┹", "┺", "┻", "┼", "┽", "┾", "┿"],
  ["╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊", "╋", "╌", "╍", "╎", "╏"],
  ["═", "║", "╒", "╓", "╔", "╕", "╖", "╗", "╘", "╙", "╚", "╛", "╜", "╝", "╞", "╟"],
  ["╠", "╡", "╢", "╣", "╤", "╥", "╦", "╧", "╨", "╩", "╪", "╫", "╬", "╭", "╮", "╯"],
  ["╰", "╱", "╲", "╳", "╴", "╵", "╶", "╷", "╸", "╹", "╺", "╻", "╼", "╽", "╾", "╿"],
] as const

export const unicodeLinesRows = [
  ["U+250x", "U+251x", "U+252x", "U+253x", "U+254x", "U+255x", "U+256x", "U+257x"],
] as const

export const unicodeBlockElements = [
  ["▀", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█", "▉", "▊", "▋", "▌", "▍", "▎", "▏"] as const,
  ["▐", "░", "▒", "▓", "▔", "▕", "▖", "▗", "▘", "▙", "▚", "▛", "▜", "▝", "▞", "▟"] as const,
]
export const unicodeBlockElementsRows = ["U+258x", "U+259x"] as const

export const vLines = ["─", "━", "┄", "┅", "┈", "┉", "╌", "╍", "╴", "╶", "╸", "╺", "╼", "╾"] as const
export const hLines = ["│", "┃", "┆", "┇", "┊", "┋", "╎", "╏", "╵", "╷", "╹", "╻", "╽", "╿"] as const
export const corners = [
  "┌",
  "┐",
  "└",
  "┘",
  "├",
  "┤",
  "┬",
  "┴",
  "┼",
  "╔",
  "╗",
  "╚",
  "╝",
  "╠",
  "╣",
  "╦",
  "╩",
  "╬",
] as const
export const diagonals = ["╱", "╲", "╳"] as const

// box borer lines
export const borderNone = ["", "", "", "", "", "", "", "", "", "", ""] as const
export const boxLines = ["┌", "┐", "└", "┘", "─", "│", "├", "┤", "┬", "┴", "┼"] as const
export const roundedBoxLines = ["╭", "╮", "╰", "╯", "─", "│", "├", "┤", "┬", "┴", "┼"] as const
export const doubleBoxLines = ["╔", "╗", "╚", "╝", "═", "║", "╠", "╣", "╦", "╩", "╬"] as const
export const dashedBoxLines = ["┌", "┐", "└", "┘", "┄", "┆", "├", "┤", "┬", "┴", "┼"] as const
export const dottedBoxLines = ["┌", "┐", "└", "┘", "┈", "┊", "├", "┤", "┬", "┴", "┼"] as const
export const thickBoxLines = ["┏", "┓", "┗", "┛", "━", "┃", "┣", "┫", "┳", "┻", "╋"] as const
export const thickerBoxLines = ["▛", "▜", "▙", "▟", "▀", "▄", "▌", "▐", "▚", "▞", "▌", "▐", "▌", "▐"] as const

export const verticalBorderOnly = ["", "", "", "", "│", "", "─", "─", "┬", "┴", "┼"] as const
export const horizontalBorderOnly = ["", "", "", "", "", "─", "├", "┤", "│", "│", "┼"] as const
export const crossesBorderOnly = ["", "", "", "", "", "", "├", "┤", "┬", "┴", "┼"] as const
