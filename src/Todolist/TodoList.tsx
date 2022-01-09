import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType } from './../App';
import TasksMap from './TasksMap';
import s from './Todolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTaskTitle: string) => void
    onChangeCheckboxStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const onChangeCheckbox = (tID: string, value: boolean) => {
        props.onChangeCheckboxStatus(props.id, tID, value)
    }

    const onRemoveHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    const changeFilterHandler = (valueFilter: FilterValueType, todolistID: string) => {
        props.changeFilter(todolistID, valueFilter)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3>{props.title}</h3><button onClick={removeTodolist} >X</button>
        <div>
            <input value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>title is require!</div>}
        </div>
        <ul>
            <TasksMap tasks={props.tasks}
                onChangeCheckbox={onChangeCheckbox}
                onRemoveHandler={onRemoveHandler}
            />
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.activeFilter : ''}
                onClick={() => changeFilterHandler('all', props.id)}>
                All
            </button>
            <button className={props.filter === 'active' ? s.activeFilter : ''}
                onClick={() => changeFilterHandler('active', props.id)}>
                Active
            </button>
            <button className={props.filter === 'completed' ? s.activeFilter : ''}
                onClick={() => changeFilterHandler('completed', props.id)}>
                Completed
            </button>
        </div>
    </div>

}




