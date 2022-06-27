import React, { useId } from "react"
import LineItem from "./LineItem"
import { formatCurrency } from "../../../helpers/utils"

const dummyLineItems = [
  {
    name: "Coffee",
    quantity: 1,
    price: 100,
  },
  {
    name: "Bagel",
    quantity: 3,
    price: 50,
  },
]

export default function LineItemsPanel() {
  const [lineItems, setLineItems] = React.useState(dummyLineItems)

  const numItems = lineItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  )
  const totalPriceString = formatCurrency(totalPrice)

  const gridStyles = "grid grid-cols-[5fr_1fr_2fr_2fr] gap-2"
  const id = useId()

  const lineItemComponents = lineItems.map((lineItem) => {
    return (
      <LineItem
        key={`${id}-${lineItem.name}`}
        {...lineItem}
        gridStyles={gridStyles}
      />
    )
  })

  return (
    <div className="bg-plum-50 p-3 flex flex-col">
      <div className="flex-grow">
        <div className={`${gridStyles} font-semibold`}>
          <span className="border-b-2 border-plum-600">Item</span>
          <span className="border-b-2 border-plum-600">Qty</span>
          <span className="border-b-2 border-plum-600">Each</span>
          <span className="border-b-2 border-plum-600">Total</span>
        </div>

        <div>{lineItemComponents}</div>
      </div>

      <div>
        <div className="grid grid-cols-2 border-t-2 border-plum-400">
          <div className="border-r-2 border-plum-400 flex justify-between p-2">
            <span>ITEMS</span>
            <span>{numItems}</span>
          </div>
          <div className="flex justify-between p-2">
            <span>TOTAL</span>
            <span>{totalPriceString}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-plum-400 text-white font-semibold px-3 py-2 rounded-md">
            CANCEL
          </button>
          <button className="bg-emerald-600 text-white font-semibold px-3 py-2 rounded-md">
            PAY
          </button>
        </div>
      </div>
    </div>
  )
}
