import {request} from "../helpers/request";

const url = {
  get: '/notes/trash',
  revert: '/notes/:noteId/revert',
  delete: '/notes/:noteId/confirm'
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
const deleteNote = ({noteId}) => {
  return request(url.delete.replace(":noteId", noteId), 'DELETE')
}
const revertNote = ({noteId}) => {
  return request(url.revert.replace(':noteId', noteId), 'PATCH')
}

export {getAll, deleteNote, revertNote}
