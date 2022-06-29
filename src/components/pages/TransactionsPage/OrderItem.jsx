import React from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../../helpers/utils"

export default function OrderItem({
  _id,
  product,
  price,
  quantity,
  isEditing,
  changeQuantity,
  removeItem,
}) {
  const handleDecrement = () => {
    const newQuantity = quantity - 1

    if (newQuantity <= 0) {
      removeItem(_id)
      return
    }

    changeQuantity(_id, newQuantity)
  }

  const handleIncrement = () => {
    changeQuantity(_id, quantity + 1)
  }

  const total = price * quantity
  return (
    <>
      <li className="grid grid-cols-6">
        <span>{product ? product.name : "product not found"}</span>
        <span>{formatCurrency(price)}</span>
        <span>
          {isEditing && <button onClick={handleDecrement}>-</button>}x{quantity}
          {isEditing && <button onClick={handleIncrement}>+</button>}
        </span>
        <span className="font-semibold">{formatCurrency(total)}</span>
        {isEditing && (
          <button
            type="button"
            className="text-red-700"
            onClick={() => removeItem(_id)}
          >
            x
          </button>
        )}
      </li>
    </>
  )
}

OrderItem.propTypes = {
  _id: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
  }),
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  removeItem: PropTypes.func.isRequired,
  changeQuantity: PropTypes.func.isRequired,
}
