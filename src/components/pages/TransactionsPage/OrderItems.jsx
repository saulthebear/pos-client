import React, { useState, useId } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import OrderItem from "./OrderItem"
import { getAuthOptions } from "../../../helpers/utils"

export default function OrderItems({
  transactionId,
  lineItems,
  handleDelete,
  updateTransaction,
  items,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedItems, setUpdatedItems] = useState(lineItems)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [itemToAdd, setItemToAdd] = useState(items[0]._id)
  const [error, setError] = useState("")

  const handleSave = async () => {
    try {
      console.log("saving!")
      const body = { lineItems: updatedItems }

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/orders/${transactionId}`,
        body,
        getAuthOptions()
      )

      setIsEditing(false)

      const updatedTransaction = response.data

      updateTransaction(updatedTransaction._id, updatedTransaction)
      console.log(response)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleAddItem = (newProductId) => {
    const newProduct = items.filter((item) => item._id === newProductId)[0]
    console.dir(newProduct)
    const newLineItem = {
      product: newProduct,
      quantity: 1,
      price: newProduct.price,
    }
    console.log("adding a new item:", newLineItem)
    setUpdatedItems([...updatedItems, newLineItem])
  }

  const handleRemoveItem = (id) => {
    console.log("removing the item with id:", id)
    const updatedItemsIds = updatedItems.map((item) => item._id)
    const index = updatedItemsIds.indexOf(id)
    console.log("Removing index", index)

    if (index === -1) return

    const updatedItemsCopy = [...updatedItems]
    updatedItemsCopy.splice(index, 1)
    setUpdatedItems(updatedItemsCopy)
  }

  const handleChangeQuantity = (id, newQuantity) => {
    console.log("changing quantity for item to", newQuantity)
    const updatedItemsIds = updatedItems.map((item) => item._id)
    const index = updatedItemsIds.indexOf(id)
    if (index === -1) return

    const updatedItemsCopy = [...updatedItems]
    const itemCopy = { ...updatedItemsCopy[index] }
    itemCopy.quantity = newQuantity
    updatedItemsCopy[index] = itemCopy
    setUpdatedItems(updatedItemsCopy)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setUpdatedItems(lineItems)
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
      <p className="text-red-700">{error}</p>
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
  handleDelete: PropTypes.func,
  transactionId: PropTypes.string.isRequired,
  updateTransaction: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
      }),
    })
  ),
}
