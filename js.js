import {readFileSync} from "fs"
import {lexer} from "./lexer.js"
import {parser} from "./parser.js"
const fileName = "./source.js"



const input = String(readFileSync(fileName))
console.log(input, "in")

function trace(name, v){
    console.log(name)
    return v
}







console.log("start")



const ast = parser(fileName,lexer(fileName, input))



console.dir(ast, {depth: null})







console.log("fini")
