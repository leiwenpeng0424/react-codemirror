import { resolve, join } from "path"
import { readdirSync, unlinkSync, statSync, fstat, rmdirSync } from "fs"
import { name } from "../../package.json"

const distDir = resolve(process.cwd(), "dist")

console.log("> Cleaning useless .d.ts files")
console.log("")

function cleanDir(dir): void {
  readdirSync(dir).forEach((file) => {
    if (!file.includes(name)) {
      if (statSync(join(dir, file)).isDirectory()) {
        cleanDir(join(dir, file))
        rmdirSync(join(dir, file))
      } else {
        unlinkSync(resolve(dir, file))
      }
    }
  })
}

/**
 * @desc 移除ts生成的dts文件，只保留api-extractor生成的dts文件
 */
cleanDir(distDir)
