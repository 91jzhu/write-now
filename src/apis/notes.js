import {request} from "../helpers/request";

const url = {
  get: '/notes/from/:notebookId',
  add: '/notes/to/:notebookId',
  update: '/notes/:noteId',
  delete: '/notes/:noteId'
}

const getAllNotes = ({notebookId}) => {
  return new Promise((resolve, reject) => {
    request(url.get.replace(':notebookId',notebookId))
      .then(res => {
        res.data.sort((a,b)=>a['updatedAt'] > b['updatedAt'] ? -1 : 1)
        resolve(res)
      }).catch(err =>
      reject(err)
    )
  })
}
const updateNote = ({noteId},{title,content}) => {
  return request(url.update.replace(':noteId', noteId), 'PATCH', {title,content})
}
const deleteNote = ({noteId}) => {
  return request(url.delete.replace(":noteId", noteId), 'DELETE')
}
const addNote = ({notebookId},{title="",content=""}={title:"",content:""}) => {
  return request(url.add.replace(":notebookId",notebookId), 'POST', {title,content})
}

export {getAllNotes, updateNote, deleteNote, addNote}
