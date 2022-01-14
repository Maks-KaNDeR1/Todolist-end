import React from 'react'
import EditableSpan from './EditableSpan'
import { TaskType } from './TodoList'
import s from './Todolist.module.css'


type TasksMapPropsType = {
    id: string
    tasks: Array<TaskType>
    onChangeCheckbox: (tID: string, value: boolean) => void
    onRemoveHandler: (tID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}


function TasksMap({ tasks, onChangeCheckbox, onRemoveHandler, changeTaskTitle, ...props }: TasksMapPropsType) {
    return (
        <div>
            {
                tasks.map(t => {
                    const onChangeTitleHandler = (newTitle: string) => {
                        changeTaskTitle(t.id, newTitle, props.id)
                    }
                
                    return (
                        <li key={t.id} className={t.isDone ? s.isDone : ''} >
                            <button onClick={() => onRemoveHandler(t.id)}>-</button>
                            <input
                                onChange={(e) => onChangeCheckbox(t.id, e.currentTarget.checked)}
                                type="checkbox" checked={t.isDone} />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                        </li>
                    )
                })
            }
        </div>
    )
}


export default TasksMap
