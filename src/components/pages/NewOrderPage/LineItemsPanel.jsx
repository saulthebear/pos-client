import React, { useId } from "react"
import PropTypes from "prop-types"
import LineItem from "./LineItem"
import { formatCurrency } from "../../../helpers/utils"


export default function LineItemsPanel({ lineItems, setLineItems, onPay }) {

  // Remove line item from line items array
  const handleRemoveLineItem = (itemId) => {
    const newLineItems = lineItems.filter(lineItem => lineItem.item._id !== itemId)
    setLineItems(newLineItems)
  }

  // Update LineItem quantity
  const handleChangeLineItem = (itemId, newQuantity) => {
    const newLineItems = lineItems.map(lineItem => {
      if (lineItem.item._id === itemId) {
        lineItem.quantity = newQuantity
      }
      return lineItem
    })
    setLineItems(newLineItems)
  }

  // Calculate number of line items and total price of line items
  const numItems = lineItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.item.price,
    0
  )
  const totalPriceString = formatCurrency(totalPrice)

  // Grid width for line item headings and line items
  const gridStyles = "grid grid-cols-[5fr_1fr_2fr_2fr] gap-2"

  const id = useId()
  const lineItemComponents = lineItems.map((lineItem) => {
    return (
      <LineItem
        key={`${id}-${lineItem.item.name}`}
        {...lineItem}
        gridStyles={gridStyles}
        handleRemoveLineItem={handleRemoveLineItem}
        handleChangeLineItem={handleChangeLineItem}
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
          <button className="bg-plum-400 text-white font-semibold px-3 py-2 rounded-md" onClick={() => setLineItems([])}>
            CANCEL
          </button>
          <button className="bg-emerald-600 text-white font-semibold px-3 py-2 rounded-md" onClick={onPay}>
            PAY
          </button>
        </div>
      </div>
    </div>
  )
}

LineItemsPanel.propTypes = {
  lineItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ),
  setLineItems: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
}
