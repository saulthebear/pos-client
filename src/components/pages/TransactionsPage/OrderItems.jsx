import React, { useState, useId } from "react"
import PropTypes from "prop-types"
import { productShape } from "../../../helpers/propTypes"
import OrderItem from "./OrderItem"

export default function OrderItems({
  items,
  handleDelete,
  updatedItems,
  setUpdatedItems,
  isEditing,
  setIsEditing,
  handleSave,
  handleCancel,
}) {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [itemToAdd, setItemToAdd] = useState(items[0]._id)

  const handleAddItem = (newProductId) => {
    const newProduct = items.filter((item) => item._id === newProductId)[0]
    console.dir(newProduct)
    const newLineItem = {
      product: newProduct,
      quantity: 1,
      price: newProduct.price,
    }
    setUpdatedItems([...updatedItems, newLineItem])
  }

  const handleRemoveItem = (id) => {
    const updatedItemsIds = updatedItems.map((item) => item._id)
    const index = updatedItemsIds.indexOf(id)

    if (index === -1) return

    const updatedItemsCopy = [...updatedItems]
    updatedItemsCopy.splice(index, 1)
    setUpdatedItems(updatedItemsCopy)
  }

  const handleChangeQuantity = (id, newQuantity) => {
    const updatedItemsIds = updatedItems.map((item) => item._id)
    const index = updatedItemsIds.indexOf(id)
    if (index === -1) return

    const updatedItemsCopy = [...updatedItems]
    const itemCopy = { ...updatedItemsCopy[index] }
    itemCopy.quantity = newQuantity
    updatedItemsCopy[index] = itemCopy
    setUpdatedItems(updatedItemsCopy)
  }

  const id = useId()
  let itemComponents = updatedItems.map((item) => (
    <div key={`${id}-${item._id}`}>
      <OrderItem
        {...item}
        isEditing={isEditing}
        removeItem={handleRemoveItem}
        changeQuantity={handleChangeQuantity}
      />
    </div>
  ))

  const editDeleteBtns = (
    <>
      <button
        className="rounded-md bg-amber-600 py-1 px-3 text-white font-medium font-red-hat-display"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
      <button
        className="rounded-md bg-red-700 py-1 px-3 text-white font-medium font-red-hat-display"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  )

  const saveCancelBtns = (
    <>
      <button
        className="rounded-md bg-green-700 py-1 px-3 text-white font-medium font-red-hat-display"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="rounded-md bg-transparent border-2 border-plum-900 py-1 px-3 text-plum-900 font-medium font-red-hat-display"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </>
  )

  const newItemSelect = (
    <>
      <select onChange={(e) => setItemToAdd(e.target.value)} value={items[0]}>
        {items.map((item) => (
          <option key={`${id}-${item._id}`} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={() => handleAddItem(itemToAdd)}>Add</button>
    </>
  )

  return (
    <div>
      <ul>{itemComponents}</ul>
      {isEditing && isAddingItem && newItemSelect}
      {isEditing && !isAddingItem && (
        <button
          className="border-2 border-slate-900"
          onClick={() => setIsAddingItem(true)}
        >
          add an item
        </button>
      )}
      <div className="flex justify-end gap-2">
        {isEditing && saveCancelBtns}
        {!isEditing && editDeleteBtns}
      </div>
    </div>
  )
}

OrderItems.propTypes = {
  items: PropTypes.arrayOf(productShape.isRequired),
  handleDelete: PropTypes.func,
  updatedItems: PropTypes.arrayOf(productShape.isRequired),
  setUpdatedItems: PropTypes.func,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
}
