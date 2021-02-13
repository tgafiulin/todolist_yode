import './Note.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TodoList from 'components/pages/note/TodoList/TodoList'
import Button from "components/common/Button/Button";
import { useHistory } from "react-router-dom";

function Note ({id}) {
    const [button, updateButton] = useState('');
    const notes = useSelector(state => state.notes.notes);
    const note = notes.filter((note) => id === note.id)[0];
    let history = useHistory();

    const handleClick = (value) => {
        updateButton(value); 
    }

    const cancel = () => {
        history.push("/");
    }

    return <div className="note">
        <h1>Edit Note</h1>
        <TodoList note={note} button={button} />
        <div className="note__buttons">
            <Button onClick={() => handleClick('reset')} className="button button--blue" value="Reset"/>
            <Button onClick={() => handleClick('redo')} className="button button--black" value="Redo Change"/>
            <Button onClick={() => handleClick('save')} className="button" value="Save"/>
            <Button onClick={cancel} className="button button--red" value="Cancel"/>
        </div>
    </div>
}

export default Note;