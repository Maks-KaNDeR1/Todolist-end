import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TaskType, TodoList } from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "html&css", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])

    const addTask = (NewTitle: string) => {
        setTasks([{ id: v1(), title: NewTitle, isDone: false }, ...tasks])
    }


    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksFoTodolist = tasks
    if (filter === 'completed') {
        tasksFoTodolist = tasks.filter(t => t.isDone === true)
    } 
    if (filter === 'active') {
        tasksFoTodolist = tasks.filter(t => t.isDone === false)
    }
    return (
        <div className="App">
            <TodoList title={"what to learn"} tasks={tasksFoTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTask}
                />
        </div>
    );
}

export default App;
