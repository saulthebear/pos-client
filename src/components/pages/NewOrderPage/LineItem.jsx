import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../../helpers/utils"

export default function LineItem({ item, quantity, gridStyles, handleChangeLineItem, handleRemoveLineItem }) {
  const totalPrice = quantity * item.price
  const totalPriceString = formatCurrency(totalPrice)
  const eachPriceString = formatCurrency(item.price)

  const [isEditing, setIsEditing] = useState(false)
  const [quantityInput, setQuantityInput] = useState(quantity)

  useEffect(() => {
    setQuantityInput(quantity)
  }, [quantity])

  const handleIncrement = () => {
    const newQuantity = quantity + 1
    handleChangeLineItem(item._id, newQuantity)
  }

  const handleDecrement = () => {
    const newQuantity = quantity - 1
    if (newQuantity > 0) {
      handleChangeLineItem(item._id, newQuantity)
      return
    }

    handleRemoveLineItem(item._id)
  }

  const handleDelete = () => {
    handleRemoveLineItem(item._id)
  }


  const handleDone = () => {
    setIsEditing(false)
  }

  const handleQuantityInputChange = (e) => {
    setQuantityInput(e.target.value)
    const newQuantity = parseInt(e.target.value)
    handleChangeLineItem(item._id, newQuantity)
  }

  const editingComponent = (<div>
    <div>
      <button onClick={handleDelete}>Delete</button>
      <span>{item.name}</span>
    </div>
    <div>
      <button onClick={handleDecrement}>-</button>
      <input type="number" value={quantityInput} onChange={handleQuantityInputChange} />
      <button onClick={handleIncrement}>+</button>
    </div>
    <button onClick={handleDone}>Done</button>
  </div>)

  const displayComponent = (<div className={`${gridStyles}`} onClick={() => setIsEditing(true)}>
    <span>{item.name}</span>
    <span className="text-center">{quantity}</span>
    <span className="text-center">{eachPriceString}</span>
    <span className="text-center font-semibold">{totalPriceString}</span>
  </div>)

  return (
    <>
      {isEditing ? editingComponent : displayComponent}
    </>
  )
}

LineItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  gridStyles: PropTypes.string.isRequired,
  handleChangeLineItem: PropTypes.func.isRequired,
  handleRemoveLineItem: PropTypes.func.isRequired,
}
