import {readFileSync} from "fs"
import {lexer} from "./lexer.js"
const fileName = "./source.js"



const input = String(readFileSync(fileName))
console.log(input, "in")

function trace(name, v){
    console.log(name)
    return v
}







console.log("start")

    console.log([...lexer(fileName, input)])







console.log("fini")