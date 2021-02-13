import './NewNote.scss'
import Input from 'components/common/Input/Input'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from 'app/reducers/notesReducer'
import { useHistory } from "react-router-dom";

function NewNote () {
    const largestID = useSelector(state => state.notes.largestID);
    const dispatch = useDispatch();
    let history = useHistory();

    const [noteTitle, editNoteTitle] = useState('');

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            dispatch(addNote(noteTitle))
            history.push(`/note/${largestID + 1}`);
        }
    }
 
    return <div>
        <h1>Create New Note</h1>
        <Input className="input" value={noteTitle} onChange={(e) => editNoteTitle(e.target.value)} onKeyPress={keyPress} placeholder="Entrer title for new note" />
    </div>
}

export default NewNote;