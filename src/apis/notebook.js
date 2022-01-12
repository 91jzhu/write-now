import {request} from "../helpers/request";
import {standard} from '../helpers/util'

const url = {
  get: '/notebooks',
  add: '/notebooks',
  update: '/notebooks/:id',
  delete: '/notebooks/:id'
}

const getAll = () => {
  return new Promise((resolve, reject) => {
    request(url.get)
      .then(res => {
        res.data.sort((a, b) => a['createdAt'] > b['createdAt'] ? -1 : 1)
        resolve(res)
      }).catch(err =>
      reject(err)
    )
  })
}
const updateNotebook = (noteBookId, {title = ""} = {title: ""}) => {
  return request(url.update.replace(':id', noteBookId), 'PATCH', {title})
}
const deleteNotebook = (noteBookId) => {
  return request(url.delete.replace(":id", noteBookId), 'DELETE')
}
const addNotebook = ({title}) => {
  return request(url.add, 'POST', {title})
}

export {getAll, updateNotebook, deleteNotebook, addNotebook}
