import './Todo.scss';
import { useState, useEffect } from 'react';
import Button from 'components/common/Button/Button'
import Input from 'components/common/Input/Input'

function Todo({todo, deleteTodo, toggleTodo, editDesc}) {
    const {id, desc, done} = todo;
    const [todoDesc, editTodoDesc] = useState(desc);
    const [edit, updateEdit] = useState(false)

    useEffect(() => {
        editTodoDesc(desc); 
    }, [desc])

    const handleEditTodoDesc = () => {
        updateEdit(true)
    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            updateEdit(false)
            editDesc(id, todoDesc);
        }
    }

    let todoJsx;

    if (!edit) {
        todoJsx = <div onClick={handleEditTodoDesc}>{todoDesc}</div>
    } else {
        todoJsx = <Input value={todoDesc} onChange={(e) => editTodoDesc(e.target.value)} onKeyPress={keyPress} />
    }

    return <div className={done ? "todo todo--done" : "todo"}>
            <span onClick={() => toggleTodo(id)} className="todo__check"></span>
            {todoJsx}
            <Button onClick={() => deleteTodo(id)} className="remove-btn"/>
        </div>
}

export default Todo;