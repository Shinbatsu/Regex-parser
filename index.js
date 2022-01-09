let parseRegExp=(str,next=()=>{term=str[0],str=str.slice(1);return term})=>{ 
  let comb=(i=2,$=calc())=>{
    while (str[0]=="|")
      if(i++<3)str=str.slice(1),$=new Or($,calc())
      else throw new Error
    return $}
    try {let r=comb()
      if (str.length) throw new Error
      else return r} 
    catch{return null}
  function calc(a=[]) {
  while ($=null||str&&(term=next())) {
      if (term=="("&&($=comb())){
        if ((term=next())!= ")")throw new Error} 
      else if(term==")"||term == "|"){str=term+str;break} 
      else if(term==".")$=new Any
      else if(term=="*")throw new Error
      else $ = new Normal(term)
      if (str[0]=="*")$=new ZeroOrMore($),str=str.slice(1)
    a.push($)} 
  if (!a.length) throw new Error
  return a.length-1?new Str(a):a[0]}
}