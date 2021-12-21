import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (NewTitle: string) => void
    
}

export function TodoList(props: TodoListPropsType) {

    let tasksElement = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>x</button>
    </li>)

    const [title, setTitle] = useState('')

    const handlecOnCange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const handleOnClick = () => {
       props.addTasks(title)
       setTitle('')
    }
    
    const handlerOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key  === 'Enter') {
            props.addTasks(title)
            setTitle('')
        }
    }


const changeFilterHandler = (valueFilter: FilterValuesType) => {
    props.changeFilter(valueFilter)
}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={handlecOnCange} 
                onKeyPress={handlerOnKeyPress}/>
                <button onClick={handleOnClick}>+</button>
            </div>
            <ul>
                {tasksElement}
            </ul>
            <div>

                <button onClick={() => changeFilterHandler('all')} >All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}

