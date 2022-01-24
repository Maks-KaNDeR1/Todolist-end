import { Button, ButtonGroup } from '@material-ui/core';
import React from 'react';
import { FilterValueType, TaskType } from './../App';
import EditableTodolist from './EditableTodolist';
import ItemInput from './ItemInput';
import TasksMap from './TasksMap';
import s from './Todolist.module.css'



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    changeCheckboxStatus: (todolistId: string, id: string, value: boolean) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTodolistTitle: string) => void
}

export function Todolist(props: PropsType) {


    const onChangeCheckbox = (tID: string, value: boolean) => {
        props.changeCheckboxStatus(props.id, tID, value)
    }

    const onRemoveHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }


    const changeFilterHandler = (valueFilter: FilterValueType, todolistID: string) => {
        props.changeFilter(todolistID, valueFilter)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const onChangeTodolistHandler = (newTodolistTitle: string) => {
        props.changeTodolistTitle(props.id, newTodolistTitle)
    }


    return <div>
        {/* <h3>{props.title} <button onClick={removeTodolist} >X</button> </h3> */}
        <EditableTodolist title={props.title}
            onChange={onChangeTodolistHandler}
            removeObject={removeTodolist}
        />

        <ItemInput addItem={addTask} />
        <ul>
            <TasksMap id={props.id}
                tasks={props.tasks}
                onChangeCheckbox={onChangeCheckbox}
                onRemoveHandler={onRemoveHandler}
                changeTaskTitle={props.changeTaskTitle}
            />
        </ul>
        <div>
            <ButtonGroup>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={() => changeFilterHandler('all', props.id)}
                    color='inherit'
                >All
                </Button>
                <Button
                 variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    onClick={() => changeFilterHandler('active', props.id)}
                    color='secondary'
                >Active
                </Button>
                <Button
                variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={() => changeFilterHandler('completed', props.id)}
                    color='primary'
                >Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>

}




