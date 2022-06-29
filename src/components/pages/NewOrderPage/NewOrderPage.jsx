import axios from "axios"
import React, { useState, useEffect, useId } from "react"
import PropTypes from "prop-types"

import { getAuthOptions } from "../../../helpers/utils"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import ItemsPanel from "./ItemsPanel"
import LineItemsPanel from "./LineItemsPanel"
import { formatCurrency } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function NewOrderPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [lineItems, setLineItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [changeAmount, setChangeAmount] = useState(0)

  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [error, setError] = useState("")

  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role === "unverified") {
    return (
      <div>You must be verified to create an order. Contact your manager.</div>
    )
  }

  useEffect(() => {
    const newTotalPrice = lineItems.reduce((sum, lineItem) => {
      return sum + lineItem.item.price
    }, 0)
    setTotalPrice(newTotalPrice)
    console.log("Total Price", totalPrice)
  }, [lineItems])

  useEffect(() => {
    const paymentAmountInCents = paymentAmount * 100
    const newChangeAmount =
      paymentAmountInCents > totalPrice ? paymentAmountInCents - totalPrice : 0
    setChangeAmount(newChangeAmount)
  }, [paymentAmount, totalPrice])

  // fetch categories and items from server
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          getAuthOptions()
        )
        console.log(response.data)
        setItems(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/categories`,
          getAuthOptions()
        )
        setCategories(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }

    fetchItems()
    fetchCategories()
  }, [])

  // For example modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handleAddLineItem = (item) => {
    const index = lineItems.findIndex(
      (lineItem) => lineItem.item._id === item._id
    )

    // if item doesn not exist in lineItems, add it
    if (index === -1) {
      setLineItems([...lineItems, { item, quantity: 1 }])
      return
    }

    // if item already exists in lineItems, increment quantity
    const updatedLineItem = {
      ...lineItems[index],
      quantity: lineItems[index].quantity + 1,
    }
    const updatedLineItems = [...lineItems]
    updatedLineItems[index] = updatedLineItem
    setLineItems(updatedLineItems)
  }

  const handleOpenPaymentModal = () => {
    if (lineItems.length === 0) {
      return
    }
    console.log("Pay")
    console.log(lineItems)

    setIsPaymentModalOpen(true)
  }

  const handlePaymentSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log("Placing order")

      const orderLineItems = lineItems.map((lineItem) => {
        const itemId = lineItem.item._id
        const price = lineItem.item.price
        const quantity = lineItem.quantity
        return { product: itemId, price, quantity }
      })

      const orderBody = {
        lineItems: orderLineItems,
        cashier: user.id,
        payment_method: paymentMethod,
      }

      console.log(orderBody)

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/orders`,
        orderBody,
        getAuthOptions()
      )

      console.log(response.data)

      setIsPaymentModalOpen(false)
      setLineItems([])
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const id = useId()

  return (
    <div className="h-full grid grid-cols-3">
      <div className="col-span-2">
        <p className="text-red-700">{error}</p>
        {/* Payment Modal */}
        <Modal isOpen={isPaymentModalOpen} setIsOpen={setIsPaymentModalOpen}>
          <ModalPanel>
            <ModalTitle>Payment</ModalTitle>
            <form onSubmit={handlePaymentSubmit}>
              <button onClick={() => setPaymentMethod("cash")}>Cash</button>
              <button onClick={() => setPaymentMethod("card")}>Card</button>
              <p>Amount due: {formatCurrency(totalPrice)}</p>
              <div>
                <label htmlFor={`${id}-amount`}>Payment Amount</label>
                <input
                  id={`${id}-amount`}
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="text-slate-900"
                />
              </div>
              <p>Change: {formatCurrency(changeAmount)}</p>
              <button onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </button>
              <button>Pay</button>
            </form>
          </ModalPanel>
        </Modal>
        <ItemsPanel
          items={items}
          categories={categories}
          onAddLineItem={handleAddLineItem}
        />
      </div>
      <LineItemsPanel
        lineItems={lineItems}
        setLineItems={setLineItems}
        onPay={handleOpenPaymentModal}
      />
    </div>
  )
}
