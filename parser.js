
export function parser(fileName,tokens){

let token = null;

function next(){
   token = tokens.next().value

}



function NumericLiteral(){
   if(token.type === "NumericLiteral"){
       const _token = token
       next()
       return _token
       
   
   }
   
   return null

}

function plusOperator(){
   if(token.type === "plusOperator"){
       const _token = token
       next()
       return _token
       
   
   }


return null
}


function BinaryExpression(){
  const left = NumericLiteral()
   if(!left) return null;
   return BinaryExpressionT(left)

}


function BinaryExpressionT(left){
  const plus = plusOperator()
  if(!plus) return left;
  const right = NumericLiteral()
  if(!right) throw new Error(`expected NumericLiteral token but got ${token.type} at ${fileName}:${token.loc.start.line}:${token.loc.start.column}`);
  
  // const more = BinaryExpressionT(right)
  
  
  const node =  {
    type: "BinaryExpression", 
    left, 
    operatorToken: plus,
    right
  }
// nesting children
return BinaryExpressionT(node)
}


next()
// next()
const prog = BinaryExpression()
//if(token != null) throw new SyntaxError(`token unkown ${JSON.stringify(token)}`)
if(token.type != "EndofFileToken") throw new Error(`expected end of file token but got ${token.type} at ${fileName}:${token.loc.start.line}:${token.loc.start.column}`)
return prog

}
