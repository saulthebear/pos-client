import React from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../../helpers/utils"

export default function OrderItems({ items }) {
  const itemComponents = items.map((item) => {
    const total = item.price * item.quantity
    return (
      <li key={item._id} className="grid grid-cols-6">
        <span>{item.product.name}</span>
        <span>{formatCurrency(item.price)}</span>
        <span>x{item.quantity}</span>
        <span className="font-semibold">{formatCurrency(total)}</span>
      </li>
    )
  })
  return (
    <div>
      <ul>{itemComponents}</ul>
      <div className="flex justify-end gap-2">
        <button className="rounded-md bg-amber-600 py-1 px-3 text-white font-medium font-red-hat-display">
          Edit
        </button>
        <button className="rounded-md bg-red-700 py-1 px-3 text-white font-medium font-red-hat-display">
          Delete
        </button>
      </div>
    </div>
  )
}

OrderItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
}
