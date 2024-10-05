import { useReducer,createContext, Dispatch, ReactNode, useMemo } from "react"
import   BudgetReducer,{BudgetActions, BudgetState, InitialState } from "../Reducers/BudgetReducer"

interface BudgetContextProps{
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remaininBudget: number
}

interface BudgetProviderProps{
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export function BudgetProvider({children} : BudgetProviderProps){

    const [state,dispatch] = useReducer(BudgetReducer, InitialState)

    const totalExpenses =useMemo(() => {
        return state.expenses.reduce((total, expense) => expense.amount + total, 0)
    }, [state.expenses])

    const remaininBudget = state.budget - totalExpenses

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remaininBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}
