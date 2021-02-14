import './Note.scss'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoList from 'components/pages/note/TodoList/TodoList'
import Button from "components/common/Button/Button";
import DialogWindow from "components/common/DialogWindow/DialogWindow";
import { useHistory } from "react-router-dom";
import { deleteNote } from "app/reducers/notesReducer"

function Note ({id}) {
    const [button, updateButton] = useState('');
    const [openModal, toggleOpenModal] = useState(false);
    const notes = useSelector(state => state.notes.notes);
    const note = notes.filter((note) => id === note.id)[0];
    let history = useHistory();
    let dispatch = useDispatch();

    const handleClick = (value) => {
        updateButton(value);
    }

    const clickCancelOrDelete = (value) => {
        updateButton(value);
        toggleOpenModal(true);
    }

    const handleModalClick = (clickYes) => {
        toggleOpenModal(false);
        if (clickYes) {
            if (button === 'delete') {
                dispatch(deleteNote(id));
            }
            history.push("/");
        }
    }

    return <div className="note">
        <div className="note__title">
            <h1>Edit Note</h1>
            <Button onClick={() => clickCancelOrDelete('delete')} className="button button--red" value="Delete note"/>
        </div>
        <TodoList note={note} button={button} />
        <div className="note__buttons">
            <Button onClick={() => handleClick('reset')} className="button button--blue" value="Reset"/>
            <Button onClick={() => handleClick('redo')} className="button button--black" value="Redo Change"/>
            <Button onClick={() => handleClick('save')} className="button" value="Save"/>
            <Button onClick={() => clickCancelOrDelete('cancel')} className="button button--red" value="Cancel"/>
        </div>
        {openModal ?  <DialogWindow accept={() => handleModalClick(true)} reject={() => handleModalClick(false)} /> : ''}
    </div>
}

export default Note;