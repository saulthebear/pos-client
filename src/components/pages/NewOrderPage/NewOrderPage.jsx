import axios from "axios"
import React, { useState, useEffect, useId } from "react"

import { getAuthOptions } from "../../../helpers/utils"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import ItemsPanel from "./ItemsPanel"
import LineItemsPanel from "./LineItemsPanel"
import { formatCurrency } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import AuthService from "../../../helpers/authServices"
import { Navigate } from "react-router-dom"
import { ButtonSmall, ButtonLarge } from "../../ui/Button"
import { PinkInput } from "../../ui/Input"

export default function NewOrderPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [lineItems, setLineItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [changeAmount, setChangeAmount] = useState(0)

  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [error, setError] = useState("")

  // const { user } = useAuth()

  const user = AuthService.getCurrentUser()

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

    setIsPaymentModalOpen(true)
  }

  const handlePaymentSubmit = async (e) => {
    try {
      e.preventDefault()

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

      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/orders`,
        orderBody,
        getAuthOptions()
      )

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
          <ModalPanel setIsOpen={setIsPaymentModalOpen}>
            <div className="grid grid-rows-[auto_1fr] h-full">
              <ModalTitle>Payment</ModalTitle>
              <form
                onSubmit={handlePaymentSubmit}
                className="flex flex-col justify-between"
              >
                <div className="space-y-3 mb-5">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold">Payment Method:</p>
                    <div className="space-x-2">
                      <ButtonSmall
                        className={
                          paymentMethod === "cash"
                            ? "bg-plum-900"
                            : "bg-plum-700"
                        }
                        type="button"
                        onClick={() => setPaymentMethod("cash")}
                      >
                        Cash
                      </ButtonSmall>
                      <ButtonSmall
                        className={
                          paymentMethod === "card"
                            ? "bg-plum-900"
                            : "bg-plum-700"
                        }
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                      >
                        Card
                      </ButtonSmall>
                    </div>
                  </div>
                  {paymentMethod === "cash" && (
                    <>
                      <div className="flex justify-evenly">
                        <div className="flex flex-col">
                          <span className="font-semibold">Amount due:</span>
                          <span className="ml-5 text-xl">
                            {formatCurrency(totalPrice)}
                          </span>
                        </div>
                        <PinkInput
                          label="Payment Amount"
                          id={`${id}-amount`}
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="w-32"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-semibold text-lg">Change:</p>
                        <p className="text-2xl">
                          {formatCurrency(changeAmount)}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-center space-x-5">
                  <ButtonLarge
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="bg-plum-700"
                  >
                    Cancel
                  </ButtonLarge>
                  <ButtonLarge type="submit" className="bg-emerald-600">
                    Pay
                  </ButtonLarge>
                </div>
              </form>
            </div>
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
