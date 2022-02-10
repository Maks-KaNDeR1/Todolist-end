import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons';


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
       setError(false)
        if (e.key === 'Enter') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        }
    }

    return (
        <div>

            <TextField variant='outlined'
            error={error}
                size='small'
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={error ? 'Title is required!' : 'Add task'}
                helperText={error}
            />
            <IconButton 
            // variant='contained' 
            color='primary'
            style={{maxHeight:'39px', minHeight:'39px' }}
                onClick={addTask}>
                    <AddBox />
                </IconButton>
        </div>
    )
}

export default ItemInput
