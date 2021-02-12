import './TodoList.scss'
import Todo from '../Todo/Todo'
import { useState } from 'react'
import Button from '../../common/Button/Button'
import Input from '../../common/Input/Input'

function TodoList({note}) {
    const {todoList, largestIdTodo} = note;
    const [newTodo, editTodo] = useState('')
    let newTodos = todoList;
    let currentLargestIdTodo = largestIdTodo;

    const addTodo = () => {
        editTodo('');
        todoList.push({
            id: currentLargestIdTodo + 1,
            desc: newTodo,
            done: false
        })

    }

    const keyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }

    return <div className="todolist">
        <div className="todolist__add-todo">
            <Input value={newTodo} onKeyPress={(e) => keyPress(e)} onChange={(e) => editTodo(e.target.value)} placeholder="Add new Todo"/>
            <Button onClick={addTodo} value="add" className="button button--small" />
        </div>
        {todoList.map((todo) => 
            <Todo key={todo.id} todo={todo} />
        )} 
    </div>
}

export default TodoList;