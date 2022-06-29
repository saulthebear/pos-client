import axios from "axios"
import React, { useState, useEffect } from "react"
import { getAuthOptions } from "../../../helpers/utils"
import Transactions from "./Transactions"
import Loading from "../../ui/Loading"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [items, setItems] = useState([])
  const [cashiers, setCashiers] = useState([])
  const [error, setError] = useState("")

  const { user, isUserLoading } = useAuth()

  if (isUserLoading) return <Loading />

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <div>You are not authorized to view this page.</div>
  }

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

    const fetchCashiers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users`,
          getAuthOptions()
        )

        const users = response.data
        const cashiers = users.filter(
          (user) => user.role === "cashier" || user.role === "admin"
        )
        setCashiers(cashiers)
      } catch (err) {
        console.warn("could not load cashiers", err)
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

    // Cashiers used for dropdown when editing a transaction
    fetchCashiers()
  }, [])

  return (
    <div className="p-5">
      <h1 className="font-red-hat-display font-black text-3xl">Transactions</h1>
      <p className="text-red-700">{error}</p>
      <Transactions
        transactions={transactions}
        setTransactions={setTransactions}
        updateTransaction={updateTransaction}
        items={items}
        cashiers={cashiers}
      />
    </div>
  )
}
