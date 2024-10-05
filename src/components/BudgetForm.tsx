import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import useBudget from "../Hooks/useBudget"


export default function BudgetForm() {

    const {dispatch} = useBudget()

    const [budget, setBudget] = useState(0)

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setBudget(event.target.valueAsNumber)
    } 

    function handleSubbmit(event : FormEvent<HTMLFormElement>){
        event.preventDefault()
        dispatch({type: 'add-budget', payload:{budget}})
    }

    const isValid = useMemo(() =>{
        return isNaN(budget) || budget <= 0
    },[budget])

    return (
        <form className="space-y-5" onSubmit={handleSubbmit}>
            <div className=" flex flex-col space-y-5">

                <label htmlFor="budget" className=" text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className=" w-full bg-white border border-gray-200 p-2"
                    name="budget"
                    value={budget}
                    placeholder="Define tu Presupuesto"
                    onChange={handleChange}
                />

            </div>

            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled = {isValid}
            />
        </form>
    )
}
