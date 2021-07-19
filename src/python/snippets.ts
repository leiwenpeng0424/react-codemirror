import {
  Completion,
  snippetCompletion as snip,
} from "@codemirror/autocomplete"

export const snippets: readonly Completion[] = [
  snip(`#!/usr/bin/env python3`, {
    label: "env",
    detail: "Adds shebang line for default python 3 interpreter.",
    type: "keyword",
  }),

  snip("import ${package}", {
    label: "import",
    detail: "Import a package or module",
    type: "keyword",
  }),

  snip("from ${package} import ${name}", {
    label: "from...import...",
    detail: "Import a package or module",
    type: "keyword",
  }),

  snip("from ${package} import ${name}", {
    label: "from... import...",
    detail: "Import a package or module",
    type: "keyword",
  }),

  snip(
    'class ${ClassName}(${object}):\n\t"""${docstring for}"""\n\tdef __init__(self, ${arg}):\n\t\t${super($1, self).__init__()}\n\t\tself.arg = arg\n\t\t',
    {
      label: "class",
      detail: "Code snippet for a class definition.",
      type: "keyword",
    }
  ),

  snip("def ${mname}(self, ${arg}):\n\t${pass}", {
    label: "defs",
    detail: "Code snippet for a class method definition.",
    type: "keyword",
  }),

  snip("def ${fname}(${arg}):\n\t${pass}", {
    label: "def",
    detail: "Code snippet for function definition.",
    type: "keyword",
  }),

  snip("async def ${fname}(${arg}):\n\t${pass}", {
    label: "def",
    detail: "Code snippet for async function definition.",
    type: "keyword",
  }),

  snip(
    '@property\ndef ${foo}(self):\n    """${The $1 property.}"""\n    ${return self._$1}\n@${$1}.setter\ndef ${$1}(self, value):\n    ${6:self._$1} = value',
    {
      label: "property",
      detail: "New property: get and set via decorator",
      type: "keyword",
    }
  ),

  snip("if ${condition}:\n\t${pass}", {
    label: "if",
    detail: "if statement.",
    type: "keyword",
  }),

  snip("for ${value} in ${iterable}:\n\t${pass}", {
    label: "for",
    detail: "create a for loop structure.",
    type: "keyword",
  }),

  snip("while ${condition}:\n\t${pass}", {
    label: "while",
    detail: "create a while loop structure.",
    type: "keyword",
  }),

  snip(
    "try:\n\t${pass}\nexcept ${Exception} as ${e}:\n\t${raise $3}",
    {
      label: "try",
      detail: "try and except blocks.",
      type: "keyword",
    }
  ),

  snip("self.${name}", {
    label: ".",
    detail:
      "Shortend snippet to reference the self property in an object.",
    type: "keyword",
  }),

  snip("__${init}__", {
    label: "__",
    detail: "create magic methods.",
    type: "keyword",
  }),

  snip('if __name__ == "__main__":\n\t${main()}', {
    label: "ifmain",
    detail:
      "Create implicitly all the code at the top level using the __name__ special variable.",
    type: "keyword",
  }),
]
