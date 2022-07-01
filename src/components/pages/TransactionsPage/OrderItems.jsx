import React, { useState, useId } from "react"
import PropTypes from "prop-types"
import { productShape } from "../../../helpers/propTypes"
import OrderItem from "./OrderItem"
import { ButtonSmall } from "../../ui/Button"

export default function OrderItems({
  items,
  handleDelete,
  updatedItems,
  setUpdatedItems,
  isEditing,
  setIsEditing,
  handleSave,
  handleCancel,
  isAddingItem,
  setIsAddingItem,
}) {
  // const [isAddingItem, setIsAddingItem] = useState(false)
  const [itemToAdd, setItemToAdd] = useState(
    items.length > 0 ? items[0]._id : []
  )

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
    <div className="flex gap-2 mt-5">
      <select
        onChange={(e) => setItemToAdd(e.target.value)}
        value={itemToAdd}
        className="bg-slate-100 rounded-md px-2 py-1 shadow-[inset_0_2px_4px_0_rgb(30_41_59/0.2)] focus:outline-none focus:ring-2 focus:ring-plum-700"
      >
        {items.map((item) => (
          <option key={`${id}-${item._id}`} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleAddItem(itemToAdd)}
        className="flex items-center"
      >
        <span className="material-symbols-rounded text-plum-800">
          add_circle
        </span>
      </button>
    </div>
  )

  return (
    <div>
      <ul>{itemComponents}</ul>
      {isEditing && isAddingItem && newItemSelect}
      {isEditing && !isAddingItem && (
        <ButtonSmall
          className="border-2 border-plum-900 flex items-center mt-3 text-plum-900"
          onClick={() => setIsAddingItem(true)}
        >
          <span className="material-symbols-rounded mr-2">playlist_add</span>
          <span>add an item</span>
        </ButtonSmall>
      )}
      <div className="flex justify-end gap-2">
        {isEditing && saveCancelBtns}
        {!isEditing && editDeleteBtns}
      </div>
    </div>
  )
}
OrderItems.propTypes = {
  items: PropTypes.arrayOf(productShape),
  handleDelete: PropTypes.func,
  updatedItems: PropTypes.arrayOf(productShape),
  setUpdatedItems: PropTypes.func,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func,
  isAddingItem: PropTypes.bool,
  setIsAddingItem: PropTypes.func,
}
