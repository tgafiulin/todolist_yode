import './NoteItem.scss'
import { Link } from "react-router-dom";
import Button from "components/common/Button/Button";

function NoteItem ({note, handleDelete}) {
    const {id, title, todoList} = note;

    return <ul className="note-item">
        <li>
            <Link to={'note/' + id}></Link>{ title }
            <Button onClick={() => handleDelete(id)} className="remove-btn"/>
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