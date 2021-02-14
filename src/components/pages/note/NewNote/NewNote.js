import './NewNote.scss'
import Input from 'components/common/Input/Input'
import Button from 'components/common/Button/Button'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from 'app/reducers/notesReducer'
import { useHistory } from "react-router-dom";

function NewNote () {
    const largestID = useSelector(state => state.notes.largestID);
    const dispatch = useDispatch();
    let history = useHistory();

    const [noteTitle, editNoteTitle] = useState('');
    const [errorMessage, editErrorMessage] = useState('');

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            addNewNote();
        }
    }

    const addNewNote = () => {
        if (noteTitle) {
            dispatch(addNote(noteTitle))
            history.push(`/note/${largestID + 1}`);
        } else {
            editErrorMessage('field must not be empty')
        }
    }

    const back = () => {
        history.push('/');
    }
 
    return <div className="new-note">
        <div className="new-note__title">
            <h1>Create New Note</h1>
            <Button onClick={back} value="back home" className="button button--red" />
        </div>
        <div className="new-note__input">
            <Input className="input" value={noteTitle} onChange={(e) => editNoteTitle(e.target.value)} onKeyPress={keyPress} placeholder="Enter title for new note" />
            <Button onClick={addNewNote} value="create" className="button" />
            <span>{errorMessage}</span>
        </div>
    </div>
}

export default NewNote;