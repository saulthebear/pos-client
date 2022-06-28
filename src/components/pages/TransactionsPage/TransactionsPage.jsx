import axios from "axios"
import React, { useState, useEffect } from "react"
import { getAuthOptions } from "../../../helpers/utils"
import Transactions from "./Transactions"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders`,
          getAuthOptions()
        )
        setTransactions(response.data)
      } catch (error) {
        // TODO: inform user of error
        console.error("Error fetching errors", error)
      }
    }
    fetchTransactions()
  }, [])

  return (
    <div className="p-5">
      <h1 className="font-red-hat-display font-black text-3xl">Transactions</h1>
      <Transactions transactions={transactions} />
    </div>
  )
}
