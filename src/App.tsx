import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist/TodoList';

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const removeTask = (todolistId: string, id: string) => {
        //      let tasks = tasksObj[todolistId]
        //      let filteredTasks = tasks.filter(t => t.id !== id)
        //      tasksObj[todolistId] = filteredTasks
        //      setTasks({ ...tasksObj })
        setTasks({ ...tasksObj, [todolistId]: tasksObj[todolistId].filter(t => t.id !== id) })
    }

    const onChangeCheckboxStatus = (todolistId: string, id: string, value: boolean) => {
        // let tasks = { ...tasksObj[todolistId] }
        // setTasks(tasks.map(m => m.id === id ? { ...m, isDone: value } : m))
        setTasks({ ...tasksObj, [todolistId]: tasksObj[todolistId].map(m => m.id === id ? { ...m, isDone: value } : m) })
    }

    const addTask = (todolistId: string, newTaskTitle: string) => {
        const newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        //        let tasks = tasksObj[todolistId]
        //        const newTasks = [newTask, ...tasks]
        //        tasksObj[todolistId] = newTasks
        //        setTasks({ ...tasksObj })
        setTasks({ ...tasksObj, [todolistId]: [newTask, ...tasksObj[todolistId]] })

    }
    // const changeFilter = (value: FilterValueType, todolistId: string) => {
    //     let todolist = todolists.find(tl => tl.id === todolistId)
    //     if (todolist) {
    //         todolist.filter = value
    //         setTodolist([...todolists])
    //     }
    // }

    const changeFilter = (todolistId: string, value: FilterValueType) => {
        setTodolist(todolists.map(m => m.id === todolistId ? { ...m, filter: value } : m))
    }


    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        { id: v1(), title: 'What to learn', filter: 'active' },
        { id: v1(), title: 'What to buy', filter: 'completed' }
    ])

    let removeTodolist = (todolistId: string) => {
        // let tasks = tasksObj[todolistId]
        // let filteredTodolistId = tasks.filter(t => t.id !== todolistId)
        // tasksObj[todolistId] = filteredTodolistId
        // setTodolist({ ...tasksObj })
        setTodolist(todolists.filter(t => t.id !== todolistId) )
        delete tasksObj[todolistId]

    }
    let [tasksObj, setTasks] = useState({
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

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]

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
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        onChangeCheckboxStatus={onChangeCheckboxStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
