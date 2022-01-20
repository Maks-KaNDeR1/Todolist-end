
export const addSalary = (salary: number, bonus: number) => salary + bonus
export const fallSalary = (salary: number, minus: number) => salary - minus
export const multSalary = (salary: number, coeff: number) => salary * coeff
export const divSalary = (salary: number, coeff: number) => salary / coeff

// 1. В параметрах - salary (state)
// 2. Тип действия в названии (type of action/ action type)
// 3. Доп. значения ждя каждого действия

export type AddSalaryActionType = {
    type: "ADD_SALARY",
    bonus: number
}
export type FallSalaryActionType = {
    type: "FALL_SALARY",
    minus: number
}
export type MultSalaryActionType = {
    type: "MULT_SALARY",
    coeff: number
}
export type DivSalaryActionType = {
    type: "DIV_SALARY",
    coeff: number
}

type ActionType = AddSalaryActionType | FallSalaryActionType |
    MultSalaryActionType | DivSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case "ADD_SALARY":
            return salary + action.bonus
        case "FALL_SALARY":
            return salary - action.minus
        case "MULT_SALARY":
            return salary * action.coeff
        case "DIV_SALARY":
            return salary / action.coeff
        default:
            return salary
    }
}