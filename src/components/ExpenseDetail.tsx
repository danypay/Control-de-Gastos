import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import useBudget from "../Hooks/useBudget"
import 'react-swipeable-list/dist/styles.css'

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => {
        return categories.filter(cat => cat.id === expense.category)[0]
    }, [expense])

    function leadingActions(){
        return(
            <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-by-id',payload:{id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
        )
    }

    function trailingActions(){
        return(
            <TrailingActions>
                <SwipeAction
                    onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id}})}
                    destructive = {true}
                >
                    Eliminar
                </SwipeAction>
            </TrailingActions>
        )
    }

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions = {leadingActions()}
                trailingActions = {trailingActions()}
            >
                <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="Imagene Icono" className="w-20" />

                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {categoryInfo.name}
                        </p>
                        <p>{expense.expenseName}</p>
                        <p className="text-sale-6000 text-sm">
                            {formatDate(expense.date!.toString())}
                        </p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
