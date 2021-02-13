import './NotesList.scss'
import { useSelector } from 'react-redux'
import NoteItem from 'components/pages/home/NoteItem/NoteItem'

function NotesList () {
    const notes = useSelector(state => state.notes.notes)

    return <div className="noteslist">
        {notes.map((note) =>
            <NoteItem 
                key={note.id}
                note={note}
            />
        )}
    </div>
}

export default NotesList;