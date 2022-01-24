import { IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { ChangeEvent, useState } from 'react'

type EditableTodolistPropsType = {
    title: string
    onChange: (newValue: string) => void
    removeObject: () => void
}

function EditableTodolist(props: EditableTodolistPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateVewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateVewMode} autoFocus />
            : <h2 onDoubleClick={activateEditMode}>
                {props.title}
                <IconButton
                    aria-label='delete'
                    onClick={props.removeObject}>
                    <Delete />
                </IconButton>
            </h2>
    )
}


export default EditableTodolist
