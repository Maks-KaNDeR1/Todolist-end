import { v1 } from 'uuid';
import { FilterValueType, TodolistType } from './../App';

export const ADD_TODOLIST = 'ADD_TODOLIST'
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
export const CHANGE_FILTER = 'CHANGE_FILTER'


export const todolistReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case ADD_TODOLIST: {
            let todolist: TodolistType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return ([todolist, ...state])
            // tasksDispatch({
            //     ...state,
            //     [todolist.id]: []
            // })
            // return state
        }
        case REMOVE_TODOLIST: {
            return state.filter(t => t.id !== action.todolistId)
            // delete tasks[todolistId]
        }
        case CHANGE_TODOLIST_TITLE: {
            return state.map(t => t.id === action.payload.id
                ? { ...t, title: action.payload.newTodolistTitle } : t)
        }
        case CHANGE_FILTER: {
            return state.map(m => m.id === action.payload.todolistId
                ? { ...m, filter: action.payload.value } : m)
        }
        default:
            return state
    }
}

type ActionsType = AddTodolistACType | RemoveTodolistACType
    | changeTodolistTitleACType | changeFilterACType

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => ({ type: ADD_TODOLIST, title })

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => ({ type: REMOVE_TODOLIST, todolistId })

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) => ({
    type: CHANGE_TODOLIST_TITLE, payload: { id, newTodolistTitle }
})


type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValueType) => ({
    type: CHANGE_FILTER, payload: { todolistId, value }
})
