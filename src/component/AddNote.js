import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";
export const AddNote = (props) => {
    
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
            
            e.preventDefault()
            addNote(note.title,note.description,note.tag)
            setNote({ title: "", description: "", tag: "" })
            props.showAlert("Added  succesfully ","success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3 ">
                    <label htmlFor="exampleInputEmail1"  className="form-label">Title</label>
                    <input type="text" onChange={onChange} required value={note.title} minLength={4} name='title' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">  </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" required value={note.description} minLength={3} name='description' id="exampleInputPassword1" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" required value={note.tag} minLength={3} name='tag' id="exampleInputPassword1" onChange={onChange} />
                </div>
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add note</button>
            </form>
        </div>
    )
}
