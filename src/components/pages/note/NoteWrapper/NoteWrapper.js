import './NoteWrapper.scss'
import { useParams } from "react-router-dom";
import NewNote from 'components/pages/note/NewNote/NewNote';
import Note from 'components/pages/note/Note/Note';

function NoteWrapper () {
    const { id } = useParams();

    return <>
        {(id === 'new') ? <NewNote /> : <Note id={parseInt(id)} />}
    </>
}

export default NoteWrapper;