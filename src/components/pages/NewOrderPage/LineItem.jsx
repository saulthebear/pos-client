import React from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../../helpers/utils"

export default function LineItem({ name, quantity, price, gridStyles }) {
  const totalPrice = quantity * price
  const totalPriceString = formatCurrency(totalPrice)
  const eachPriceString = formatCurrency(price)

  return (
    <div className={`${gridStyles}`}>
      <span>{name}</span>
      <span className="text-center">{quantity}</span>
      <span className="text-center">{eachPriceString}</span>
      <span className="text-center font-semibold">{totalPriceString}</span>
    </div>
  )
}

LineItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  gridStyles: PropTypes.string.isRequired,
}
