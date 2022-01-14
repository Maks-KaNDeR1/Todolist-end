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
            : <h3 onDoubleClick={activateEditMode}>
                {props.title}
                <button onClick={props.removeObject}> X </button>
            </h3>
    )
}


export default EditableTodolist
