import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: JSON.parse(localStorage.getItem("todostate")) || {
        largestID: 2,
        notes: [
            {
                id: 1,
                title: 'Магазин',
                largestIdTodo: 3,
                todoList: [
                    {
                        id: 1,
                        desc: 'Яйца',
                        done: false
                    },
                    {
                        id: 2,
                        desc: 'Молоко',
                        done: false
                    },
                    {
                        id: 3,
                        desc: 'Хлеб',
                        done: false
                    }
                ]
            },
            {
                id: 2,
                title: 'Работа',
                largestIdTodo: 2,
                todoList: [
                    {
                        id: 1,
                        desc: 'Отчет',
                        done: false
                    },
                    {
                        id: 2,
                        desc: 'Планерка в 10-00',
                        done: false
                    }
                ]
            }
        ]
    },
    reducers: {
        incrementLargestID: (state) => {
            state.largestID = state.largestID + 1;
            localStorage.setItem('todostate', JSON.stringify(state))
        },
        addNote: (state, action) => {
            state.notes.push({
                id: state.largestID + 1,
                title: action.payload,
                largestIdTodo: 0,
                todoList: []
            })
            state.largestID++;
            localStorage.setItem('todostate', JSON.stringify(state))
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
            localStorage.setItem('todostate', JSON.stringify(state))
        },
        updateTodoList: (state, action) => {
            const {id, todos, largestIdTodo} = action.payload;
            state.notes = state.notes.map((note) => {
                if (note.id === id) {
                    note.todoList = [...todos];
                    note.largestIdTodo = largestIdTodo;
                }
                return note;
            })
            localStorage.setItem('todostate', JSON.stringify(state))
            return state;
        }
    }
})


export const { incrementLargestID, deleteNote, updateTodoList, addNote } = notesSlice.actions
export default notesSlice.reducer

