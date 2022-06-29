import axios from "axios"
import React, { useState, useEffect } from "react"
import { getAuthOptions } from "../../../helpers/utils"
import Transactions from "./Transactions"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [items, setItems] = useState([])
  const [error, setError] = useState("")

  const updateTransaction = (id, updatedTransaction) => {
    const transactionIds = transactions.map((transaction) => transaction._id)
    const transactionsCopy = [...transactions]
    const index = transactionIds.indexOf(id)

    if (index === -1) return

    transactionsCopy[index] = updatedTransaction
    setTransactions(transactionsCopy)
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders`,
          getAuthOptions()
        )
        setTransactions(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }
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

    fetchTransactions()
    // Items used for dropdown when editing a transaction
    fetchItems()

    // Fetch items, to show in dropdown when editing a transaction
  }, [])

  return (
    <div className="p-5">
      <p className="text-red-700">{error}</p>
      <h1 className="font-red-hat-display font-black text-3xl">Transactions</h1>
      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        updateTransaction={updateTransaction}
        items={items}
      />
    </div>
  )
}
