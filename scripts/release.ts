import { spawn } from "child_process"
import minimist from "minimist"
import chalk from "chalk"
import fs from "fs"
import path from "path"
import { version } from "../package.json"

const args = minimist(process.argv.slice(2))

function isValidVersion(version) {
  return /(\d.+|\d).(\d.+|\d).(\d.+|\d)/.test(version)
}

let pre_version = version

type PubType = "major" | "minor" | "patch"

function bumpUpVersion(version: string, type: PubType): string {
  if (!isValidVersion(version)) {
    console.log(
      chalk.red(
        "not a valid version, please check your package.json file, and the version field. [Major.Minor.Path]"
      )
    )

    process.exit(2)
  }

  let [major, minor, patch] = version.split(".")

  switch (type) {
    case "major": {
      major = String(Number(major) + 1)
      minor = String(0)
      patch = String(0)
      break
    }
    case "minor": {
      minor = String(Number(minor) + 1)
      patch = String(0)
      break
    }
    case "patch": {
      patch = String(Number(patch) + 1)
      break
    }
  }

  return [major, minor, patch].join(".")
}

function updatePackageJson(
  fields: {
    [key: string]: string | number
  } = {}
): void {
  const file = path.resolve(__dirname, "..", "package.json")

  try {
    let json = fs.readFileSync(file).toString()
    json = {
      ...JSON.parse(json),
      ...fields,
    }

    fs.writeFileSync(file, JSON.stringify(json, null, 2), {
      encoding: "utf-8",
    })
  } catch (e) {
    console.log(
      chalk.red("encountered error while processing the package.json file"),
      e
    )
  }
}

function reversion(): void {
  console.log("> Reversion...")
  updatePackageJson({ version: pre_version })
  console.log("> Finished")
  console.log("")
}

if (!args.type) {
  console.log(chalk.red("Please specify a publish type, using --type"))
  console.log("")
  process.exit(2)
}

console.log(chalk.cyan("> Starting publish process"))

updatePackageJson({
  version: bumpUpVersion(version, args.type),
})

const child = spawn("pnpm", ["publish", "--tag", "latest", "--no-git-checks"], {
  stdio: "inherit",
  cwd: process.cwd(),
})

child
  .on("error", (e) => {
    console.error(e.stack)
  })
  .on("close", (code) => {
    if (code !== 0) {
      reversion()
    } else {
      console.log("Publish process finished!")
    }
  })
