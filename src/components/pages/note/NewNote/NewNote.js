import './NewNote.scss'
import Button from 'components/common/Button/Button'
import AddInput from 'components/pages/note/AddItem/AddItem'
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from 'app/reducers/notesReducer'
import { useHistory } from "react-router-dom";

function NewNote () {
    const largestID = useSelector(state => state.notes.largestID);
    const dispatch = useDispatch();
    let history = useHistory();

    const addNewNote = (noteTitle) => {
        dispatch(addNote(noteTitle))
        history.push(`/note/${largestID + 1}`);
    }

    const back = () => {
        history.push('/');
    }
 
    return <div className="new-note">
        <div className="new-note__title">
            <h1>Create New Note</h1>
            <Button onClick={back} value="back home" className="button button--red" />
        </div>
        <AddInput placeholder="Enter title for new note" buttonValue="Create" addNewItem={addNewNote} />
    </div>
}

export default NewNote;