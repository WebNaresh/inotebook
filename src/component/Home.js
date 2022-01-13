import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export const Home = () => {
    const a =  useContext(noteContext)
    return (
        <div>
            This is home
        </div>
    )
}
