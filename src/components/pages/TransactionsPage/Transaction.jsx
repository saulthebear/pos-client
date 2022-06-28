import React from "react"
import PropTypes from "prop-types"
import OrderItems from "./OrderItems"
import { formatCurrency, formatDate, formatTime } from "../../../helpers/utils"

export default function Transaction({
  lineItems,
  cashier,
  payment_method,
  createdAt,
  gridStyles,
}) {
  const [showDetails, setShowDetails] = React.useState(false)

  const total = lineItems.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  const numItems = lineItems.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

  const date = new Date(createdAt)

  const details = (
    <div className="p-5 bg-slate-200 rounded-b-lg">
      <OrderItems items={lineItems} />
    </div>
  )

  return (
    <div className="mb-5">
      <div className={`${gridStyles} border-b-2 border-slate-900 text-center`}>
        <div className="flex flex-col">
          <span>{formatDate(date)}</span> <span>{formatTime(date)}</span>
        </div>
        <span>{formatCurrency(total)}</span>
        <span>{numItems}</span>
        <span>{payment_method}</span>
        <span>{cashier.username}</span>
        <span>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="rounded-md bg-plum-600 py-1 px-2 text-white font-medium font-red-hat-display"
          >
            {showDetails ? "Hide" : "Show"}
          </button>
        </span>
      </div>

      {showDetails && details}
    </div>
  )
}

Transaction.propTypes = {
  _id: PropTypes.string.isRequired,
  lineItems: PropTypes.arrayOf(
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
  cashier: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    role: PropTypes.string,
  }),
  payment_method: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  gridStyles: PropTypes.string,
}
