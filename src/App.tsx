import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ItemInput from './Todolist/ItemInput';
import { TaskType, Todolist } from './Todolist/TodoList';

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'active' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false },
            { id: v1(), title: "Css", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Book", isDone: false },

        ]
    })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolist([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }
    const removeTask = (todolistId: string, id: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        const newTask:TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
      
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })

    }
    // const changeFilter = (value: FilterValueType, todolistId: string) => {
    //     let todolist = todolists.find(tl => tl.id === todolistId)
    //     if (todolist) {
    //         todolist.filter = value
    //         setTodolist([...todolists])
    //     }
    // }
    const changeCheckboxStatus = (todolistId: string, id: string, value: boolean) => {
        // let tasks = { ...tasks[todolistId] }
        // setTasks(tasks.map(m => m.id === id ? { ...m, isDone: value } : m))
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(m => m.id === id ? { ...m, isDone: value } : m)
        })
    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolist(todolists.map(m => m.id === todolistId ? { ...m, filter: value } : m))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]

    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(m => m.id === id ? { ...m, title: newTitle } : m)
        })
    }

    const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
        setTodolist(
            // ...tasks, [todolists]: tasks[todolists]
            todolists.map(t => t.id === id ? { ...t, title: newTodolistTitle } : t)
        )
    }


    return (
        <div className="App">
            <ItemInput addItem={addTodolist} />
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]    
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckboxStatus={changeCheckboxStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
