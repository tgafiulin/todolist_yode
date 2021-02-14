import './Note.scss'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoList from 'components/pages/note/TodoList/TodoList'
import Button from "components/common/Button/Button";
import DialogWindow from "components/common/DialogWindow/DialogWindow";
import { useHistory } from "react-router-dom";
import { deleteNote } from "app/reducers/notesReducer"

function Note ({id}) {
    const [openModal, toggleOpenModal] = useState(false);
    const notes = useSelector(state => state.notes.notes);
    const note = notes.filter((note) => id === note.id)[0];
    let history = useHistory();
    let dispatch = useDispatch();

    const acceptModal = () => {
        toggleOpenModal(false);
        dispatch(deleteNote(id));
        history.push("/");
    }

    return <div className="note">
        <div className="note__title">
            <h1>Edit Note</h1>
            <Button onClick={() => toggleOpenModal(true)} className="button button--red" value="Delete note"/>
        </div>
        <TodoList note={note} />
        {openModal ?  <DialogWindow accept={() => acceptModal()} reject={() => toggleOpenModal(false)} /> : ''}
    </div>
}

export default Note;