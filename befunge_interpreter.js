function interpret(code_) 
{
  let stack = [];
  let ptrx = 0, ptry = 0;
  let ostream = "";
  code_ = code_.split('')
  //code_.pop();
  code_ = code_.join('');
  code_ = code_.split('\n');
  
  let p = 0;
  
  let code = [];
  for(let c of code_)
    code.push(c.split(''));
  
  let hor = code[0].length;
  let vert = code.length;
    
  let row = 0;
  let k = 0;
  let movement = 0;
  let stringMode = false;
  let skip = false;
  while(true)
  {
   k++; 
    ptrx = ptrx >= code[ptry].length ? 0 : ptrx < 0 ? code[ptry].length - 1 : ptrx;
    ptry = ptry >= code.length ? 0 : ptry < 0 ? vert - 1 : ptry; 
    
    let cmd = code[ptry][ptrx];
    
    if(stringMode && cmd != "\"")
    {
      stack.push(cmd.charCodeAt(0));
    }
    else if(cmd == " " || (cmd >= '0' && cmd <= '9'))
    {
        if(cmd != " ")
          stack.push(+cmd);
    }
    else
    {
    switch(cmd)
    {
      //case (cmd >= '0' && cmd <= '9'): stack.push(cmd); break;
      case '+' : stack.push(stack.pop() + stack.pop()); break;
      case '-' : {let b = stack.pop(), a = stack.pop(); stack.push(a - b)}; break;
      case '*' : stack.push(stack.pop() * stack.pop()); break;
      case '/' : {let a = stack.pop(), b = stack.pop(); stack.push(!a || Math.floor(b / a))}; break;
      case '%' : {let a = stack.pop(), b = stack.pop(); stack.push(!a || b % a)}; break;
      case '!' : stack.push(!stack.pop() || 0); break;
      case '`' : {let a = stack.pop(), b = stack.pop(); stack.push( b > a || 0)}; break;
      case '>' : movement = 0; break;
      case '<' : movement = 1; break;
      case '^' : movement = 2; break;
      case 'v' : movement = 3; break;
      case '?' : movement = Math.floor(Math.random() * 4); break;
      case '_' : if(!stack.pop()) movement = 0; else movement = 1; break;
      case '|' : if(!stack.pop()) movement = 3; else movement = 2; break;
      case "\"": stringMode = !stringMode; break;
      case '\\': 
        if(stack.length == 1)
          stack.push(0);
        else
        {
          let temp = stack[stack.length - 1];
          stack[stack.length - 1] = stack[stack.length - 2];
          stack[stack.length - 2] = temp;
        }
        break;
      case '$' : stack.pop(); break;
      case ',' : ostream += String.fromCharCode(stack.pop()); break;
      case '#' : skip = true; break;
      case '.' : ostream += +stack.pop(); break;
      case ':' : if(stack.length) stack.push(stack[stack.length - 1]); else stack.push(0); break;
      case 'p' : 
        let y = stack.pop(); let x = stack.pop(); let v = stack.pop();
        code[y][x] = String.fromCharCode(v);
        break;
      case 'g' : let y_ = stack.pop(); let x_ = stack.pop();
        stack.push(code[y_][x_].charCodeAt(0)); break;// console.log(code); break;
      
      case '@' : return ostream;
    }
    }
    
    if(movement == 0)
    {
      ptrx++;
      if(skip)
        ptrx++, skip = false;
    }
    if(movement == 1)
    {
      ptrx--;
      if(skip)
        ptrx--, skip = false;
    }
    if(movement == 2)
    {
      ptry--;
      if(skip)
        ptry--, skip = false;
    }
    if(movement == 3)
    {
      ptry++;
      if(skip)
        ptry++, skip = false;
    }
    
  }
  return ostream;
}
