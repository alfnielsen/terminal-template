import $ from "../src"

$.print`${$.border.box}${$.p1}
[blue] My header 

[center] Simple box
`

$.print`${$.border.box}${$.p1}
[header] My header 
[center] Simple box
`

$.print` ${$.border.dashed} ${$.p1} ${$["m-1"]}
[header] My header 

${$.yellow}Usage:

[cyan]npm run [[command]]     [gray][[options?]]

[separator]

[yellow]Commands:

  start                     [gray]Start dev-tool ( server + client )
  compile                   [gray]Compile Command components ( for React )
  help                      [gray]Show help
  exit                      [gray]Exit

[yellow]Options:

  --port                    [gray]Port for the dev-tool client (default: 9000)
  --server                  [gray]Port for the dev-tool server (default: 9014)
  --dev                     [gray]Start dev-tool in dev mode (default: false)

`

// console.log("content:")
// console.log(compile(content))
