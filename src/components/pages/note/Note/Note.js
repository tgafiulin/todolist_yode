import './Note.scss'
import { useSelector } from 'react-redux'
import TodoList from 'components/pages/note/TodoList/TodoList'

function Note ({id}) {
    const notes = useSelector(state => state.notes.notes);
    const note = notes.filter((note) => id === note.id)[0];

    return <div>
        <h2>Edit Note</h2>
        <TodoList note={note} />
    </div>
}

export default Note;