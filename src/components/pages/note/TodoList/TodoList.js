import './TodoList.scss'
import { useEffect, useState } from 'react'
import Todo from 'components/pages/note/Todo/Todo'
import Button from 'components/common/Button/Button'
import Input from 'components/common/Input/Input'
import DialogWindow from "components/common/DialogWindow/DialogWindow";
import { useDispatch } from 'react-redux';
import { updateTodoList } from 'app/reducers/notesReducer'
import { useHistory } from "react-router-dom";

function TodoList({note, button}) {
    const {todoList, largestIdTodo, title} = note;
    const [newTodo, editTodo] = useState('')
    const [newTodos, editTodoList] = useState(todoList.map(a => Object.assign({}, a)));
    const [tempTodos, editTempTodoList] = useState([]);
    const [openModal, toggleOpenModal] = useState(false);
    const [idTodo, editIdTodo] = useState('');
    const [currentLargestIdTodo, incrementLargestIdTodo] = useState(largestIdTodo);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        switch(button) {
            case 'reset':
                editTempTodoList(newTodos.map(a => Object.assign({}, a)));
                editTodoList(todoList.map(a => Object.assign({}, a)));
                break;
            case 'redo':
                if (!tempTodos.length) break;
                editTodoList(tempTodos.map(a => Object.assign({}, a))); 
                break;
            case 'save':
                dispatch(updateTodoList({
                    id: note.id,
                    largestIdTodo: currentLargestIdTodo,
                    todos: newTodos
                }))
                history.push("/");
                break;
        }
    }, [button])

    const addTodo = (e, press) => {
        if (press) {
            if (e.key !== 'Enter') {
                return;
            }
        } 

        if (newTodo) {
            editTodo('');
            newTodos.push({
                id: currentLargestIdTodo + 1,
                desc: newTodo,
                done: false
            })
            incrementLargestIdTodo(currentLargestIdTodo + 1);
        }
    }

    const deleteTodo = (id) => {
        editIdTodo(id);
        toggleOpenModal(true);
    }

    const handleModalClick = (clickYes) => {
        if (clickYes) {
            editTodoList(newTodos.filter((todo) => todo.id !== idTodo))
        }
        toggleOpenModal(false);
        editIdTodo('');
    }

    const toggleTodo = (id) => {
        let todos = newTodos.map((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
            return todo;
        })
        editTodoList(todos);
    }

    const editDesc = (id, desc) => {
        let todos = newTodos.map((todo) => {
            if (todo.id === id) {
                todo.desc = desc;
            }
            return todo;
        })
        editTodoList(todos);
    }

    return <div className="todolist">
        <h2>{title}</h2>
        <div className="todolist__add-todo">
            <Input value={newTodo} className="input" onKeyPress={(e) => addTodo(e, true)} onChange={(e) => editTodo(e.target.value)} placeholder="Add new Todo"/>
            <Button onClick={addTodo} value="add" className="button button--small" />
        </div>
        {newTodos.map((todo) => 
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} editDesc={editDesc} />
        )} 
        {openModal ?  <DialogWindow accept={() => handleModalClick(true)} reject={() => handleModalClick(false)} /> : ''}
    </div>
}

export default TodoList;