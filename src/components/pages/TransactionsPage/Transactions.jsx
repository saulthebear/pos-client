import React from "react"
import PropTypes from "prop-types"
import Transaction from "./Transaction"

export default function Transactions({
  transactions,
  setTransactions,
  updateTransaction,
  items,
  cashiers,
}) {
  // Grid width for transaction headings and transactions
  const gridStyles = "grid grid-cols-6 gap-2"

  const removeTransaction = (id) => {
    const transactionIds = transactions.map((transaction) => transaction._id)
    const index = transactionIds.indexOf(id)
    if (index === -1) return
    const updatedTransactions = [...transactions]

    updatedTransactions.splice(index, 1)
    setTransactions(updatedTransactions)
  }

  const transactionComponents = transactions.map((transaction) => {
    return (
      <Transaction
        key={transaction._id}
        {...transaction}
        gridStyles={gridStyles}
        removeTransaction={removeTransaction}
        updateTransaction={updateTransaction}
        items={items}
        cashiers={cashiers}
      />
    )
  })

  return (
    <div>
      <div
        className={`${gridStyles} font-semibold font-red-hat-display text-2xl text-center`}
      >
        <span>Date</span>
        <span>Total</span>
        <span>Items</span>
        <span>Payment</span>
        <span>Cashier</span>
      </div>
      {transactionComponents}
    </div>
  )
}

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      lineItems: PropTypes.arrayOf(
        PropTypes.shape({
          product: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
          }),
          price: PropTypes.number,
          quantity: PropTypes.number,
          _id: PropTypes.string,
        })
      ),
      cashier: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        role: PropTypes.string,
      }),
      payment_method: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  setTransactions: PropTypes.func,
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
  cashiers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
    })
  ),
}
