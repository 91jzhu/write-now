import {request} from "../helpers/request";

const url={
  get:'/notebooks',
  add:'/notebooks',
  update:'/notebooks/:id',
  delete:'/notebooks/:id'
}

const getAll=()=>{
  return request(url.get)
}
const updateNotebook=(noteBookId,{title=""}={title:""})=>{
  return request(url.update.replace(':id',noteBookId),'PATCH',{title})
}
const deleteNotebook=(noteBookId)=>{
  return request(url.delete.replace(":id",noteBookId),'DELETE')
}
const addNotebook=({title})=>{
  return request(url.add,'POST',{title})
}

export {getAll,updateNotebook,deleteNotebook,addNotebook}
