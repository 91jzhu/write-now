const standard=(string)=>{
  let str
  if(!string){
    str='未知'
    return str
  }
  let time=Date.parse(string)
  let now=Date.now()
  let space=now -time

  if(space<1000*60){
    str='刚刚'
  }else if(space<1000*3600){
    str=Math.floor(space/(1000*60))+'分钟前'
  }else if(space<1000*3600*24){
    str=Math.floor(space/(1000*3600))+'小时前'
  }else{
    str=Math.floor(space/(1000*3600*24))+'天前'
  }
  return str
}
export {standard}
