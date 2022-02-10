import { TaskType } from '../App';
import { v1 } from "uuid";
import { TasksStateType } from "../App";

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const CHANGE_CHECKBOX_STATUS = 'CHANGE_CHECKBOX_STATUS'
export const CHANGE_TASK_TITLE = 'CHANGE_CHECKBOX_STATUS'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.id)
            }
            //     const stateCopy = {...state} 
            //     const filteredTasks = state[action.todolistId].filter(t => t.id !== action.id)
            //     stateCopy[action.todolistId] = filteredTasks 
            //    return stateCopy
        }
        case ADD_TASK: {
            const newTask: TaskType = {
                id: v1(),
                title: action.newTaskTitle,
                isDone: false
            }
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
        }
        // case CHANGE_CHECKBOX_STATUS: {
        //     return ({
        //         ...state, [action.todolistId]: state[action.todolistId]
        //             .map(m => m.id === action.id ? { ...m, isDone: action. } : m)
        //     })
        // }
        // case CHANGE_TASK_TITLE: {
        //     return {
        //         ...state, [action.todolistId]: state[action.todolistId]
        //             .map(m => m.id === action.id ? { ...m, title: action. } : m)
        //     }
        // }
        default: return state
    }
}

type ActionsType =
    removeTaskACType |
    AddTaskACType |
    changeCheckboxStatusACType |
    changeTaskTitleACType

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, newTaskTitle: string) =>
    ({ type: ADD_TASK, todolistId, newTaskTitle } as const)

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) =>
    ({ type: REMOVE_TASK, todolistId, id } as const)

type changeCheckboxStatusACType = ReturnType<typeof changeCheckboxStatusAC>
export const changeCheckboxStatusAC = (todolistId: string, isDone: boolean, id: string) =>
    ({ type: CHANGE_CHECKBOX_STATUS, todolistId, isDone, id } as const)

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, newTitle: string, id: string) =>
    ({ type: CHANGE_TASK_TITLE, todolistId, newTitle, id } as const)