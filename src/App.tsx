import { Container, Grid, Paper } from '@material-ui/core';
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { AddTaskAC, changeCheckboxStatusAC, removeTaskAC, TaskReducer } from './redux/tasks-reduce';
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistReducer } from './redux/todolists-reducer';
import ItemInput from './Todolist/ItemInput';
import { Todolist } from './Todolist/TodoList';

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, todolistsDispatch] = useReducer(todolistReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'active' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' }
    ])

    let [tasks, tasksDispatch] = useReducer(TaskReducer, {
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
        // let todolist: TodolistType = {
        //     id: v1(),
        //     title: title,
        //     filter: 'all'
        // }
        // todolistsDispatch([todolist, ...todolists])
        // tasksDispatch({
        //     ...tasks,
        //     [todolist.id]: []
        // })
        todolistsDispatch(addTodolistAC(title))
    }

        const removeTodolist = (todolistId: string) => {
        // todolistsDispatch(todolists.filter(t => t.id !== todolistId))
        // delete tasks[todolistId]
        todolistsDispatch(removeTodolistAC(todolistId))
    }

    const removeTask = (todolistId: string, id: string) => {
        // tasksDispatch({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
        tasksDispatch(removeTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        tasksDispatch(AddTaskAC(todolistId, newTaskTitle))

    }
    // const changeFilter = (value: FilterValueType, todolistId: string) => {
    //     let todolist = todolists.find(tl => tl.id === todolistId)
    //     if (todolist) {
    //         todolist.filter = value
    //         todolistsDispatch([...todolists])
    //     }
    // }
    const changeCheckboxStatus = (todolistId: string, id: string, value: boolean) => {
        // let tasks = { ...tasks[todolistId] }
        // tasksDispatch(tasks.map(m => m.id === id ? { ...m, isDone: value } : m))
        // tasksDispatch({
        //     ...tasks, [todolistId]: tasks[todolistId]
        //         .map(m => m.id === id ? { ...m, isDone: value } : m)
        // })
        tasksDispatch(changeCheckboxStatusAC(todolistId, id, value))

    }
    const changeFilter = (todolistId: string, value: FilterValueType) => {
        todolistsDispatch(changeFilterAC(todolistId, value))
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        tasksDispatch({
            ...tasks, [todolistId]: tasks[todolistId]
                .map(m => m.id === id ? { ...m, title: newTitle } : m)
        })
    }
    const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
        // todolistsDispatch(
        //     todolists.map(t => t.id === id ? { ...t, title: newTodolistTitle } : t)
        // )
        todolistsDispatch(changeTodolistTitleAC(id, newTodolistTitle))
    }


    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{ padding: '20px' }} >
                    <ItemInput addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }

                            return <Grid item>
                                <Paper style={{ padding: '10px' }}>
                            <Todolist
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
                            </Paper>
                              </Grid>
                        })
                    }
            </Grid>
        </Container>

        </div >
    );
}

export default App;
