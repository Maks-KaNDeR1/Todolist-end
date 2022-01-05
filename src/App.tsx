import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist/TodoList';

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    let [filter, setFilter] = useState<FilterValueType>('all')
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: false },
        { id: v1(), title: "Css", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])


    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const onChangeCheckboxStatus = (id: string, value: boolean) => {
       setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))
    }

    const addTask = (newTaskTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)

    }
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                onChangeCheckboxStatus={onChangeCheckboxStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
