import { Parser, NodeProp } from "lezer"
import {
  LezerLanguage,
  indentNodeProp,
  delimitedIndent,
  foldNodeProp,
  foldInside,
  LanguageSupport,
} from "@codemirror/language"
import { styleTags, tags } from "@codemirror/highlight"

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = Parser.deserialize({
  version: 13,
  states:
    "!WQYQPOOOhQPO'#CdOOQO'#Ci'#CiOOQO'#Ce'#CeQYQPOOOOQO,59O,59OOyQPO,59OOOQO-E6c-E6cOOQO1G.j1G.j",
  stateData:
    "![~O[OSPOS~ORQOSQOTQOVPO~ORQOSQOTQOUTOVPO~ORQOSQOTQOUWOVPO~O",
  goto: "u^PPPPPPPP_ePPPoXQOPSUQSOQUPTVSUXROPSU",
  nodeNames:
    "⚠ LineComment Program Identifier String Boolean ) ( Application",
  maxTerm: 13,
  nodeProps: [
    [NodeProp.openedBy, 6, "("],
    [NodeProp.closedBy, 7, ")"],
  ],
  skippedNodes: [0, 1],
  repeatNodeCount: 1,
  tokenData:
    "#y~RYXYqYZq]^qpqqrs!Sst!qxy#Pyz#U!Q![#Z!]!^#n~vS[~XYqYZq]^qpqq~!VTOr!Srs!fs#O!S#O#P!k#P~!S~!kOS~~!nPO~!S~!tQ#Y#Z!z#h#i!z~#POT~~#UOV~~#ZOU~~#`RR~}!O#i!Q![#Z![!]#i~#nOR~~#sQP~OY#nZ~#n",
  tokenizers: [0],
  topRules: { Program: [0, 2] },
  tokenPrec: 0,
})

const LogLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Identifier: tags.variableName,
        String: tags.string,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
})
function log() {
  return new LanguageSupport(LogLanguage)
}

export { LogLanguage, log }
