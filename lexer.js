



export function* lexer(fileName,str){
    let cursor = 0
    let char = str[cursor]
    let line = 1
    let column = 1



    function newLine(){
        line++
        column = 1
    }
   function next(){
       cursor++
        char = str[cursor]
       column++
   }


    function number(){
        let buffer = ""
        const start = {line, column}
        while(+char || char === "0"){
            // char = str[cursor]
        
                buffer += char
                next()
        }

        if(buffer.length >= 1){
         const end = {line, column}
        return{
                type: "NumericLiteral", 
               value: +buffer,
                 loc: {
                 start,
                 end
              }
            }
        }

     return null
    }

    function isWhitespace(c){
        return char === " " || char === "\t"
    }


function operator(){
      
      if(char === "+"){
          const start = {line, column}
          next()
          const end = {line, column}
          return {
              type: "plusOperator", 
              loc: {
                 start,
                 end
              }


          }
      }

      if(char === "*"){
        const start = {line, column}
        next()
        const end = {line, column}
        return {
            type: "mulOperator", 
            loc: {
               start,
               end
            }


        }
    }

      return null
     

}

function eof(){
    //  char = str[cursor]
     if(char === undefined){
        //  else if is unfrequent(end of file)
       // cursor++ // go over str length, to break out of all dependent loops
       const start = {line, column}
     //  const end = start
        return {
            type: "EndofFileToken",
            loc:{start, end: start}
        }
     }
     
     return null
}




function whitespace(){

    if(isWhitespace(char)){
        next()
    }else{
        return null
    }


  
    while(isWhitespace(char)){
   
        next()
    }

    return true
  
}



function eol(){

    if(char === "\n"){
        newLine()
        next()
    }else{
        return null
    }


  
    while(char === "\n"){
        newLine()
        next()
    }

    return true
  
}

  for(;;){
     
    //   console.log(cursor)
    let token =  whitespace() || operator()|| number() ||  eol(); 
    
 
    if(token){
        if(token === true){
            continue
        }

        yield token

        continue
    }
    
    const maybeEOF = eof()
    // console.log(maybeEOF)
    if(maybeEOF){
      yield maybeEOF
       break;
    }
    // else if(char === undefined){
    //     //  else if is unfrequent(end of file)
    //     yield {
    //         type: "EOF"
    //     }

    // } 
   
        throw new SyntaxError(`Unxepected character "${char}" at ${fileName}:${line}:${column}`)
   


  }


}
