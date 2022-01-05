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
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTaskTitle: string) => void
    onChangeCheckboxStatus: (id: string, value: boolean) => void
    filter: FilterValueType
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const onChangeCheckbox = (tID: string, value: boolean) => {
        props.onChangeCheckboxStatus(tID, value)
    }

    const onRemoveHandler = (tID: string) => {
        props.removeTask(tID)
    }

    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }
    const changeFilterHandler = (valueFilter: FilterValueType) => {
        props.changeFilter(valueFilter)
    }

    return <div>
        <h3>{props.title}</h3>
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
                onClick={() => changeFilterHandler('all')}>
                All
            </button>
            <button className={props.filter === 'active' ? s.activeFilter : ''}
                onClick={() => changeFilterHandler('active')}>
                Active
            </button>
            <button className={props.filter === 'completed' ? s.activeFilter : ''}
                onClick={() => changeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    </div>

}




