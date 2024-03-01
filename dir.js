// let glob = require("glob")
import glob from "fast-glob";
import fs from "fs";
glob("./src/lib/**/*").then(res => {
    fs.writeFile("./files.txt", res.join("\n"), ()=>true)
})
