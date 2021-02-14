import './TodoList.scss'
import { useState } from 'react'
import Todo from 'components/pages/note/Todo/Todo'
import DialogWindow from "components/common/DialogWindow/DialogWindow";
import AddInput from 'components/pages/note/AddItem/AddItem'
import Button from "components/common/Button/Button";
import { useDispatch } from 'react-redux';
import { updateTodoList } from 'app/reducers/notesReducer'
import { useHistory } from "react-router-dom";

function TodoList({note}) {
    const {todoList, largestIdTodo, title} = note;
    const [newTodos, editTodoList] = useState(todoList.map(a => Object.assign({}, a)));
    const [tempTodos, editTempTodoList] = useState([]);
    const [openModal, toggleOpenModal] = useState(false);
    const [idTodo, editIdTodo] = useState('');
    const [currentLargestIdTodo, incrementLargestIdTodo] = useState(largestIdTodo);
    const dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (button) => {
        switch(button) {
            case 'reset':
                // Если нажата reset, то клонируем текущее состоянии во временный массив, а текущее заменяем на исходное
                editTempTodoList(newTodos.map(a => Object.assign({}, a)));
                editTodoList(todoList.map(a => Object.assign({}, a)));
                break;
            case 'redo':
                // Если redo нажата раньше reset (временный массив пустой), то ничего не делаем
                if (!tempTodos.length) break;
                // Если нажата redo, то клонируем в массив с текущим состоянием временный массив
                editTodoList(tempTodos.map(a => Object.assign({}, a))); 
                break;
            case 'save':
                // При сохранении dispatch-им текущее состояние в store И возвращемся на главную страницу 
                dispatch(updateTodoList({
                    id: note.id,
                    largestIdTodo: currentLargestIdTodo,
                    todos: newTodos
                }))
                history.push("/");
                break;
            case 'cancel':
                // если нажата cancel, запускаем диалоговое окно для уточнения решения
                toggleOpenModal(true);
                break;
        }
    }

    const addTodo = (todoTitle) => {
        newTodos.push({
            id: currentLargestIdTodo + 1,
            desc: todoTitle,
            done: false
        })
        incrementLargestIdTodo(currentLargestIdTodo + 1);
    }

    const deleteTodo = (id) => {
        editIdTodo(id);
        toggleOpenModal(true);
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

    const acceptModal = () => {
        // диалоговое окно на текущей странице открывается только на удаление или отмену изменений.
        // если idTodo не пустое, значит диалоговое окно вызвано для удаления
        // иначе оно вызвано для отмены изменений
        if (idTodo) {
            editTodoList(newTodos.filter((todo) => todo.id !== idTodo))
        } else {
            history.push("/");
        }
        toggleOpenModal(false);
        editIdTodo('');
    }

    return <div className="todolist">
        <h2>{title}</h2>
        <AddInput placeholder="Add new Todo" buttonValue="Add" addNewItem={addTodo} />
        {newTodos.map((todo) => 
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} editDesc={editDesc} />
        )} 
        <div className="todolist__buttons">
            <Button onClick={() => handleClick('reset')} className="button button--blue" value="Reset"/>
            <Button onClick={() => handleClick('redo')} className="button button--black" value="Redo Change"/>
            <Button onClick={() => handleClick('save')} className="button" value="Save"/>
            <Button onClick={() => handleClick('cancel')} className="button button--red" value="Cancel"/>
        </div>
        {openModal ?  <DialogWindow accept={() => acceptModal()} reject={() => toggleOpenModal(false)} /> : ''}
    </div>
}

export default TodoList;