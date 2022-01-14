import React from 'react';
import { FilterValueType } from './../App';
import ItemInput from './ItemInput';
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
    changeCheckboxStatus: (todolistId: string, id: string, value: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, value: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    // onChange: (value: string) => void
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
        props.addTask(title, props.id)
    }

 

    return <div>
        <h3>{props.title}</h3><button onClick={removeTodolist} >X</button>
        <ItemInput addItem={addTask} />
        <ul>
            <TasksMap  id={props.id}
             tasks={props.tasks}
                onChangeCheckbox={onChangeCheckbox}
                onRemoveHandler={onRemoveHandler}
                changeTaskTitle={props.changeTaskTitle}
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




