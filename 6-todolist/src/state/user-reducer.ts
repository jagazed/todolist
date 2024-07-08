type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'Bava':
        case 'yo':
        default:
            throw new Error("i don't understand this action type")
    }
}