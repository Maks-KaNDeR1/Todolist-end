import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from './../App';

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
export const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case ADD_TODOLIST: {
            let newTodolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        }
        case REMOVE_TODOLIST: {
            return state.filter(t => t.id !== action.todolistId)
            // delete tasks[todolistId]
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(t => t.id === action.payload.id
                ? { ...t, title: action.payload.newTodolistTitle } : t)
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(m => m.id === action.payload.todolistId
                ? { ...m, filter: action.payload.value } : m)
        }
        default:
            return state
    }
}

type ActionsType =
    AddTodolistACType |
    RemoveTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({ type: ADD_TODOLIST, title } as const)

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) =>
    ({ type: REMOVE_TODOLIST, todolistId } as const)

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) =>
    ({ type: CHANGE_TODOLIST_TITLE, payload: { id, newTodolistTitle } } as const)

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, value: FilterValuesType) =>
    ({ type: CHANGE_TODOLIST_FILTER, payload: { todolistId, value } } as const)
