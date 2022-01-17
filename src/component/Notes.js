import React, { useContext,useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import { AddNote } from './AddNote';
import { Notesitem } from './Notesitem';

export const Notes = (props) => {
    const context = useContext(noteContext)
    let navigate = useNavigate()
    const { notes, getallNote,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem("token")) {
        getallNote()
        }else{
            navigate("/login")
        }
         // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const ref2 = useRef(null)
    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "Default" })
    

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }
    const handleClick = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag)
        ref2.current.click()
        props.showAlert("Updated  succesfully ","success")
        e.preventDefault()
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (

        <div className='container my-5' >

            <AddNote showAlert={props.showAlert} />

            <button ref={ref} id='hideme' type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="container">
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form className='container'>
                                <div className="mb-3 ">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" value={note.etitle}  required minLength={4} onChange={onChange} name='etitle' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" value={note.edescription}  className="form-control" name='edescription' id="exampleInputPassword1" required minLength={4} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag}  name='etag' id="exampleInputPassword1" required minLength={4} onChange={onChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={ref2} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" disabled={note.etitle.length<5||note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row my-3">
                <h1>Your Note</h1>
                {notes.length ===0 ?  <div className='container'>note notes to display</div>:""}
                {notes.map((note) => {
                    return <Notesitem showAlert={props.showAlert}  key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}
