import { Container, Grid, Paper } from '@material-ui/core';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { addTaskAC, changeCheckboxStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './redux/tasks-reduce';
import { addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, removeTodolistAC, todolistsReducer } from './redux/todolists-reducer';
import ItemInput from './Todolist/ItemInput';
import { Todolist } from './Todolist/TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
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

    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'active' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' }
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
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
         todolistsDispatch(removeTodolistAC(todolistId))
        }
        const changeFilter = (todolistId: string, value: FilterValuesType) => {
            todolistsDispatch(changeTodolistFilterAC(todolistId, value))
        }
        const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
            todolistsDispatch(changeTodolistTitleAC(id, newTodolistTitle))
        }
        
    const removeTask = (todolistId: string, id: string) => {
        tasksDispatch(removeTaskAC(todolistId, id))
    }
    const addTask = (todolistId: string, newTaskTitle: string) => {
        tasksDispatch(addTaskAC(todolistId, newTaskTitle))

    }
    const changeCheckboxStatus = (todolistId: string,  value: boolean, id: string) => {
         tasksDispatch(changeCheckboxStatusAC(todolistId, value, id))

    }
    const changeTaskTitle = (todolistId: string, newTitle: string, id: string) => {
         tasksDispatch(changeTaskTitleAC(todolistId, newTitle, id))
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
