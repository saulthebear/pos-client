import axios from "axios"
import React, { useState, useEffect, forwardRef } from "react"
import { getAuthOptions } from "../../../helpers/utils"
import Transactions from "./Transactions"
import Loading from "../../ui/Loading"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import AuthService from "../../../helpers/authServices"
import DatePicker from "react-datepicker"
import { CancelButton } from "../../ui/Button"

import "react-datepicker/dist/react-datepicker.css"

export default function TransactionsPage() {
  const initialStartDate = new Date("2020-01-01")
  const initialEndDate = new Date()

  const [transactions, setTransactions] = useState([])
  const [items, setItems] = useState([])
  const [cashiers, setCashiers] = useState([])
  const [error, setError] = useState("")
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  // const { user, isUserLoading } = useAuth()

  // if (isUserLoading) return <Loading />

  // Set filtered transactions based on start and end dates
  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate)
    }

    const newFilteredTransactions = transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt)
        return transactionDate >= startDate && transactionDate <= endDate
      })
      .sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return bDate - aDate
      })
    console.log("filtered transactions", newFilteredTransactions)
    setFilteredTransactions(newFilteredTransactions)
  }, [transactions, endDate, startDate])

  const user = AuthService.getCurrentUser()

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
    <div className="p-5 mx-auto max-w-7xl">
      <h1 className="font-red-hat-display font-black text-3xl">Transactions</h1>
      <p className="text-red-700">{error}</p>
      <div>
        <div className="flex gap-2 my-5">
          <div className="flex gap-2 items-center">
            <p>Start:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="bg-slate-200 rounded-md px-2 py-1 w-full shadow-[inset_0_2px_4px_0_rgb(30_41_59/0.5)] text-gray-800 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-gray-700"
            />
          </div>
          <div className="flex gap-2 items-center">
            <p>End:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="bg-slate-200 rounded-md px-2 py-1 w-full shadow-[inset_0_2px_4px_0_rgb(30_41_59/0.5)] text-gray-800 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-gray-700"
            />
          </div>
          <CancelButton
            onClick={() => {
              setStartDate(initialStartDate)
              setEndDate(initialEndDate)
            }}
          />
        </div>
      </div>
      {filteredTransactions.length > 0 && cashiers.length > 0 ? (
        <Transactions
          transactions={filteredTransactions}
          setTransactions={setTransactions}
          updateTransaction={updateTransaction}
          items={items}
          cashiers={cashiers}
        />
      ) : (
        <Loading />
      )}
    </div>
  )
}
