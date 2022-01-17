import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:4000"

  const noteInitial = [

  ]

  const [notes, setNotes] = useState(noteInitial)

  // Add a Note
  const getallNote = async () => {

    // fetch api
    let url = `${host}/api/notes/fetchallnote`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  // Add a Note
  const addNote = async (title, description, tag) => {

    // fetch api
    let url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note =await response.json()
    setNotes(notes.concat(note))

  }
  // delete a Note
  const deleteNote =  async(id) => {
    // Api call
    // fetch api
    let url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);

  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // fetch api
    let url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);


    let newNotes= JSON.parse(JSON.stringify(notes))
    // setNotes(tag,title,description)
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag

        break
      }
      
    }
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getallNote }}>
      {props.children}
    </NoteContext.Provider>

  )
}
export default NoteState;