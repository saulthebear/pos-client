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
      <li className="grid grid-cols-6 mb-1">
        <span className="flex items-center justify-center">
          {product ? product.name : "product not found"}
        </span>
        <span className="flex items-center justify-center">
          {formatCurrency(price)}
        </span>
        <div className="flex items-center justify-center">
          {isEditing && (
            <button onClick={handleDecrement}>
              <span className="material-symbols-rounded text-sm border-2 border-plum-800 text-plum-900 rounded-full h-5 w-5 flex items-center justify-center mx-2">
                remove
              </span>
            </button>
          )}
          <span className="text-plum-900">x{quantity}</span>
          {isEditing && (
            <button onClick={handleIncrement}>
              <span className="material-symbols-rounded text-sm border-2 border-plum-800 text-plum-900 rounded-full h-5 w-5 flex items-center justify-center mx-2">
                add
              </span>
            </button>
          )}
        </div>
        <span className="font-semibold flex items-center justify-center">
          {formatCurrency(total)}
        </span>
        {isEditing && (
          <button
            type="button"
            className="text-red-700 hover:bg-red-200 rounded-lg w-fit p-1 flex items-center justify-center"
            onClick={() => removeItem(_id)}
          >
            <span className="material-symbols-rounded">close</span>
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
