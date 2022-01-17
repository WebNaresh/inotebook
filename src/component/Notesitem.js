import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
export const Notesitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote,editNote} = context;

    const {note,updateNote } = props;
    return (
        <div className='container my-2 col-md-3 '>
            <div className="card">
                    <div className="card-body my-3">
                        <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas mx-2 fa-edit " onClick={()=>{updateNote(note);
       
    }} ></i>
                        <i className="fas mx-2 fa-trash-alt" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted  succesfully ","success")}}></i>
                        </div>
                        <p className="card-text"  >{note.description}</p>
                        
                    </div>
            </div>
        </div>
    )
}
