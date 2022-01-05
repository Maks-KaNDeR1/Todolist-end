import React from 'react'
import { TaskType } from './TodoList'
import s from './Todolist.module.css'


type TasksMapPropsType = {
    tasks: Array<TaskType>
    onChangeCheckbox: (tID: string, value: boolean) => void
    onRemoveHandler: (tID: string) => void
}


function TasksMap({ tasks, onChangeCheckbox, onRemoveHandler, ...props }: TasksMapPropsType) {
    return (
        <div>
            {
                tasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? s.isDone : ''} >
                            <button onClick={() => onRemoveHandler(t.id)}>-</button>
                            <input
                                onChange={(e) => onChangeCheckbox(t.id, e.currentTarget.checked)}
                                type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </li>
                    )
                }
                )
            }
        </div>
    )
}

export default TasksMap
