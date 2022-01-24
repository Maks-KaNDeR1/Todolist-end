import { TaskType } from './../App';
import { v1 } from "uuid";
import { TasksStateType } from "../App";

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CHANGE_CHECKBOX_STATUS = 'CHANGE_CHECKBOX_STATUS'
export const CHANGE_TISK_TITLE = 'CHANGE_CHECKBOX_STATUS'

export const TaskReducer = (state: Array<TasksStateType>, action: ActionsType) => {
    switch (action.type) {
        case REMOVE_TASK: {
            // setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
            return ({ ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id) })
            // .filter(t => t.id !== action.id)
        }
        case ADD_TASK: {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.newTaskTitle,
                isDone: false
            }
            return ({ ...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]] })
        }
        case CHANGE_CHECKBOX_STATUS: {
            let tasks = { ...state[action.payload.todolistId] }
            // return ({...state, [action.payload.todolistId]: state[action.payload.todolistId]]
            //     .map(m => m.id === action.payload.id ? { ...m, isDone: action.payload.value } : m)
            return tasks.map(m => m.id === action.payload.id
                ? { ...m, isDone: action.payload.value } : m)
        }
        case CHANGE_TISK_TITLE: {
            return ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                .map(m => m.id === action.payload.id ? { ...m, title: action.payload.newTitle } : m)
        }
    }
        default:
return state
    }
}

type ActionsType = removeTaskACType | AddTaskACType
    | changeCheckboxStatusACType | changeTaskTitleACType

type AddTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (todolistId: string, newTaskTitle: string, isDone: boolean) => ({
    type: ADD_TASK,
    payload: {
        todolistId,
        newTaskTitle,
        isDone
    }
})

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: REMOVE_TASK,
    payload: {
        todolistId,
        id
    }
})

type changeCheckboxStatusACType = ReturnType<typeof changeCheckboxStatusAC>
export const changeCheckboxStatusAC = (todolistId: string, id: string, value: boolean) => ({
    type: CHANGE_CHECKBOX_STATUS,
    payload: {
        todolistId,
        id,
        value
    }
})


type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, newTitle: string, id: string) => ({
    type: CHANGE_TISK_TITLE,
    payload: {
        todolistId,
        newTitle,
        id
    }
})