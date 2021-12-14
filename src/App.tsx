import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "html&css", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }
    let tasksFoTodolist = tasks
    if(filter === 'completed') {
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
                />
        </div>
    );
}

export default App;
