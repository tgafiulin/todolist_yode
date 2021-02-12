import React from 'react';
import './NoteWrapper.scss'
import { useParams } from "react-router-dom";
import NewNote from '../NewNote/NewNote';
import Note from '../Note/Note';

function NoteWrapper () {
    const { id } = useParams();

    return <>
        {(id === 'new') ? <NewNote /> : <Note id={parseInt(id)} />}
    </>
}

export default NoteWrapper;