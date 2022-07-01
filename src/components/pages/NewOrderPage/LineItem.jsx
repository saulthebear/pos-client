import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { formatCurrency } from "../../../helpers/utils"
import { Input } from "../../ui/Input"

export default function LineItem({
  item,
  quantity,
  gridStyles,
  handleChangeLineItem,
  handleRemoveLineItem,
}) {
  const totalPrice = quantity * item.price
  const totalPriceString = formatCurrency(totalPrice)
  const eachPriceString = formatCurrency(item.price)

  const [isEditing, setIsEditing] = useState(false)
  const [quantityInput, setQuantityInput] = useState(quantity)

  useEffect(() => {
    setQuantityInput(quantity)
  }, [quantity])

  const handleIncrement = () => {
    const newQuantity = parseInt(quantityInput) + 1
    setQuantityInput(newQuantity)
    // handleChangeLineItem(item._id, newQuantity)
  }

  const handleDecrement = () => {
    const newQuantity = parseInt(quantityInput) - 1
    if (newQuantity > 0) {
      setQuantityInput(newQuantity)
      // handleChangeLineItem(item._id, newQuantity)
      return
    }

    handleRemoveLineItem(item._id)
  }

  const handleDelete = () => {
    handleRemoveLineItem(item._id)
  }

  const handleDone = () => {
    const newQuantity = parseInt(quantityInput)
    handleChangeLineItem(item._id, newQuantity)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setQuantityInput(quantity)
  }

  const handleQuantityInputChange = (e) => {
    setQuantityInput(e.target.value)
    // const newQuantity = parseInt(e.target.value)
    // handleChangeLineItem(item._id, newQuantity)
  }

  const editingComponent = (
    <div
      className={` flex justify-between bg-plum-300 px-2 py-2 mt-3 rounded-md`}
    >
      <div className="flex items-center">
        <button
          onClick={handleDelete}
          className="flex items-center bg-white rounded-full py-1 px-1 text-plum-400 mr-2"
        >
          <span className="material-symbols-rounded font-semibold">delete</span>
        </button>
        <span>{item.name}</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="flex items-center bg-white rounded-full p-1 text-plum-400 m-1"
        >
          <span className="material-symbols-rounded font-semibold">remove</span>
        </button>
        <input
          type="number"
          value={quantityInput}
          onChange={handleQuantityInputChange}
          className="w-12 text-center rounded-md py-1 outline-none appearance-none no-arrow text-plum-400 font-semibold text-lg"
        />
        <button
          onClick={handleIncrement}
          className="flex items-center bg-white rounded-full p-1 text-plum-400 m-1"
        >
          <span className="material-symbols-rounded font-semibold">add</span>
        </button>
      </div>
      <button
        onClick={handleDone}
        className="flex items-center bg-plum-700 text-white rounded-md w-10 h-10 justify-center"
      >
        <span className="material-symbols-rounded">done</span>
      </button>
      <button
        onClick={handleCancel}
        className="flex items-center bg-transparent rounded-md w-10 h-10 justify-center border-2 border-plum-700 text-plum-700"
      >
        <span className="material-symbols-rounded text-md">close</span>
      </button>
    </div>
  )

  const displayComponent = (
    <div className={`${gridStyles}`} onClick={() => setIsEditing(true)}>
      <span>{item.name}</span>
      <span className="text-center">{quantity}</span>
      <span className="text-center">{eachPriceString}</span>
      <span className="text-center font-semibold">{totalPriceString}</span>
    </div>
  )

  return <>{isEditing ? editingComponent : displayComponent}</>
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
