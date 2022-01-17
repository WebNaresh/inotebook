import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import { AddNote } from './AddNote';
import { Notes } from './Notes';

export const Home = (props) => {
    const context = useContext(noteContext)
    const { notes, setNotes } = context;
    const {showAlert}= props;
    return (
        <>
            <div>
                <Notes showAlert={props.showAlert} />
            </div>

        </>
    )
}
