import React from "react"
import LineItems from "./LineItems"

export default function LineItemsPanel() {
  const gridStyles = "grid grid-cols-[5fr_1fr_2fr_2fr] gap-2"
  return (
    <div className="bg-plum-50 p-3 flex flex-col">
      <div className="flex-grow">
        <div className={`${gridStyles} font-semibold`}>
          <span className="border-b-2 border-plum-600">Item</span>
          <span className="border-b-2 border-plum-600">Qty</span>
          <span className="border-b-2 border-plum-600">Each</span>
          <span className="border-b-2 border-plum-600">Total</span>
        </div>
        <LineItems />
      </div>

      <div>
        <div className="grid grid-cols-2 border-t-2 border-plum-400">
          <div className="border-r-2 border-plum-400 flex justify-between p-2">
            <span>ITEMS</span>
            <span>0</span>
          </div>
          <div className="flex justify-between p-2">
            <span>TOTAL</span>
            <span>$ 0.00</span>
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
