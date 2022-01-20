import { addSalary, AddSalaryActionType, divSalary, DivSalaryActionType, fallSalary, FallSalaryActionType, multSalary, MultSalaryActionType, salaryReducer } from "./tasks"

test.only('addSalre', () => {
    //1. естовые данные
    const salary: number = 700
    const bonus: number = 250

    //2. Выполнение тестируемого кода
    const result = addSalary(salary, bonus)
    
    //3. Проверка ожидаемого результата
    expect(result).toBe(950)
})
test.only('fallSalary', () => {
    const salary: number = 900
    const minus: number = 50

    const result = fallSalary(salary, minus)
    expect(result).toBe(850)
})
test.only('multSalary', () => {
    const salary: number = 800
    const coeff: number = 1.2

    const result = multSalary(salary, coeff)
    expect(result).toBe(960)
})
test.only('divSalary', () => {
    const salary: number = 1200
    const coeff: number = 1.2

    const result = divSalary(salary, coeff)
    expect(result).toBe(1000)
})

test.only('case ADD_SALARY of salaryReducer', () => {
    const salary: number = 700
    const action: AddSalaryActionType = {
        type: "ADD_SALARY",
        bonus: 300
    }

    expect(salaryReducer(salary, action)).toBe(1000)
})
test.only('case FALL_SALARY of salaryReducer', () => {
    const salary: number = 900
    const action: FallSalaryActionType = {
        type: "FALL_SALARY",
        minus: 50
    }

    expect(salaryReducer(salary, action)).toBe(850)
})
test.only('case MULT_SALARY of salaryReducer', () => {
    const salary: number = 800
    const action: MultSalaryActionType = {
        type: "MULT_SALARY",
        coeff: 1.2
    }

    expect(salaryReducer(salary, action)).toBe(960)
})
test.only('case DIV_SALARY of salaryReducer', () => {
    const salary: number = 1200
    const action: DivSalaryActionType = {
        type: "DIV_SALARY",
        coeff: 1.2
    }

    expect(salaryReducer(salary, action)).toBe(1000)
})
