import './NotesList.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import NoteItem from 'components/pages/home/NoteItem/NoteItem'
import DialogWindow from "components/common/DialogWindow/DialogWindow";
import { deleteNote } from 'app/reducers/notesReducer'
import { useDispatch } from 'react-redux'

function NotesList () {
    const [openModal, toggleOpenModal] = useState(false);
    const [idNote, editIdNote] = useState('');
    const notes = useSelector(state => state.notes.notes)
    const dispatch = useDispatch();

    const handleDeleteClick = (id) => {
        toggleOpenModal(true);
        editIdNote(id);
    }

    const handleModalClick = (clickYes) => {
        if (clickYes) {
            dispatch(deleteNote(idNote));
        }
        toggleOpenModal(false);
        editIdNote('');
    }

    return <div className="noteslist">
        {notes.map((note) =>
            <NoteItem 
                key={note.id}
                note={note}
                handleDelete={handleDeleteClick}
            />
        )}
        {openModal ?  <DialogWindow accept={() => handleModalClick(true)} reject={() => handleModalClick(false)} /> : ''}
    </div>
}

export default NotesList;