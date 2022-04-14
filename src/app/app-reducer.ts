
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type initialStateType = {
   status: RequestStatusType
   error: string | null;
}


const initialState = {
   status: 'loading' as RequestStatusType,
   error: null 
}

// type InitialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
   switch (action.type) {
       case 'APP/SET-STATUS':
           return {...state, status: action.status}
       case 'APP/SET-ERROR':
           return {...state, error: action.error}
       default:
           return state
   }
}

export const setError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


export type setErrorActionType = ReturnType< typeof setError>
export type setStatusActionType = ReturnType< typeof setStatus>

type ActionsType = 
  | setErrorActionType
  | setStatusActionType


