import React, { useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"

import OrderItems from "./OrderItems"
import {
  formatCurrency,
  formatDate,
  formatTime,
  getAuthOptions,
} from "../../../helpers/utils"
import {
  lineItemShape,
  productShape,
  userShape,
} from "../../../helpers/propTypes"

export default function Transaction({
  _id,
  lineItems,
  cashier,
  payment_method,
  createdAt,
  gridStyles,
  removeTransaction,
  setError,
  updateTransaction,
  items,
  cashiers,
}) {
  const [showDetails, setShowDetails] = React.useState(false)
  const [updatedCashier, setUpdatedCashier] = React.useState(cashier)
  const [updatedPaymentMethod, setUpdatedPaymentMethod] =
    React.useState(payment_method)
  const [updatedItems, setUpdatedItems] = useState(lineItems)
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/orders/${_id}`,
        getAuthOptions()
      )

      removeTransaction(_id)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleSave = async () => {
    try {
      const lineItemsToSend = updatedItems.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
        }
      })

      const body = {
        cashier: updatedCashier._id,
        payment_method: updatedPaymentMethod,
        lineItems: lineItemsToSend,
      }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/orders/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditing(false)
      const updatedTransaction = response.data
      updateTransaction(updatedTransaction._id, updatedTransaction)
    } catch (err) {
      console.warn("error saving transaction", err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  // Reset all the fields to their original values
  const handleCancel = () => {
    setIsEditing(false)
    setUpdatedItems(lineItems)
    setUpdatedCashier(cashier)
    setUpdatedPaymentMethod(payment_method)
  }

  const handleChangeCashier = (e) => {
    const newCashierId = e.target.value
    const newCashier = cashiers.find((cashier) => cashier._id === newCashierId)
    setUpdatedCashier(newCashier)
  }

  const total = lineItems.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  const numItems = lineItems.reduce((sum, item) => {
    return sum + item.quantity
  }, 0)

  const date = new Date(createdAt)

  const details = (
    <div className="p-5 bg-slate-200 rounded-b-lg">
      <OrderItems
        items={items}
        handleDelete={handleDelete}
        updatedItems={updatedItems}
        setUpdatedItems={setUpdatedItems}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  )

  // Display the cashier's name when not editing
  const cashierDisplay = (
    <>
      <span>{cashier.username}</span>
    </>
  )

  // Display a select box when editing
  const cashierSelect = (
    <>
      <select onChange={handleChangeCashier} value={updatedCashier._id}>
        {cashiers.map((cashier) => (
          <option key={`${_id}-${cashier._id}`} value={cashier._id}>
            {cashier.username}
          </option>
        ))}
      </select>
    </>
  )

  const paymentMethodDisplay = (
    <>
      <span>{payment_method}</span>
    </>
  )

  const paymentMethodSelect = (
    <>
      <select
        onChange={(e) => setUpdatedPaymentMethod(e.target.value)}
        value={updatedPaymentMethod}
      >
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>
    </>
  )

  return (
    <div className="mb-5">
      <div className={`${gridStyles} border-b-2 border-slate-900 text-center`}>
        <div className="flex flex-col">
          <span>{formatDate(date)}</span> <span>{formatTime(date)}</span>
        </div>
        <span>{formatCurrency(total)}</span>
        <span>{numItems}</span>
        {isEditing ? paymentMethodSelect : paymentMethodDisplay}
        {isEditing ? cashierSelect : cashierDisplay}
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
  gridStyles: PropTypes.string,
  _id: PropTypes.string.isRequired,
  lineItems: PropTypes.arrayOf(lineItemShape.isRequired).isRequired,
  items: PropTypes.arrayOf(productShape.isRequired),
  cashier: userShape,
  cashiers: PropTypes.arrayOf(userShape.isRequired),
  payment_method: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  removeTransaction: PropTypes.func,
  setError: PropTypes.func,
  updateTransaction: PropTypes.func,
}
