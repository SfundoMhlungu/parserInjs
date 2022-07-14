



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

        while(+char || char === "0"){
            // char = str[cursor]
        
                buffer += char
                next()
        }

        if(buffer.length >= 1){
        return{
                type: "number", 
               value: +buffer
            }
        }

     return null
    }

    function isWhitespace(c){
        return char === " " || char === "\t"
    }

function eof(){
    //  char = str[cursor]
     if(char === undefined){
        //  else if is unfrequent(end of file)
       // cursor++ // go over str length, to break out of all dependent loops
        return {
            type: "EOF"
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
    let token =  whitespace() || number() ||  eol() || eof()
    
 
    if(token){
        if(token === true){
            continue
        }

        yield token

        if(token.type === "EOF"){
            break;
        }
    }
    // else if(char === undefined){
    //     //  else if is unfrequent(end of file)
    //     yield {
    //         type: "EOF"
    //     }

    // } 
    else{
        throw new SyntaxError(`Unxepected character "${char}" at ${fileName}:${line}:${column}`)
    }


  }


}