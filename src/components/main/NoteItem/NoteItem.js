import React from 'react';
import './NoteItem.scss'
import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../../app/reducers/notesReducer'

function NoteItem ({note}) {
    const {id, title, todoList} = note;
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteNote(id));
    }

    return <ul className="note">
        <li>
            <Link to={'note/' + id}></Link>{ title }
            <Button onClick={handleDelete} className="remove-btn"/>
        </li>
        {todoList.map((todo, index) => {
            if (index < 2) {
                return <li key={todo.id}><span>{todo.desc}</span></li>
            }
            return '';
        })}
    </ul>
}

export default NoteItem;