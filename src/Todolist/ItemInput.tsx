import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './Todolist.module.css'


type ItemInputPropsType = {
    addItem: (newTaskTitle: string) => void
}


function ItemInput(props: ItemInputPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? s.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>title is require!</div>}
        </div>
    )
}

export default ItemInput
