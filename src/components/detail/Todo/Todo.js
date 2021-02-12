import './Todo.scss';
import { useState } from 'react';

function Todo({todo}) {
    const {id, desc, done} = todo;
    const [checked, toggleChecked] = useState(done);

    const toggleTodo = () => {
        toggleChecked(!checked);
    }

    return <div className={checked ? "todo todo--done" : "todo"} onClick={toggleTodo}>
            {desc}
        </div>
}

export default Todo;