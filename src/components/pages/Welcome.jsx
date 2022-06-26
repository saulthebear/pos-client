import React from "react"
import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <>
      <Link to={`/admin/categories`}>Categories</Link>
      <Link to={`/admin/products`}>Products</Link>
      <Link to={`/admin/employees`}>Employees</Link>
      <Link to={`/orders/new`}>New Orders</Link>
    </>
  )
}
