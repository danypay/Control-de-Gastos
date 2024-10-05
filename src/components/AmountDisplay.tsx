import { formatCurrency } from "../helpers"

interface AmountDisplayProps{
    label?: string
    amount: number
}

export default function AmountDisplay({amount,label}: AmountDisplayProps) {
  return (
    <p className=" text-2xl text-blue-600 font-bold">
        {label && `${label}:`}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}