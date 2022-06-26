import React from "react"
import OrderItems from "./OrderItems"

export default function Order() {
  return (
    <div className="bg-pink-100 p-5 mb-2">
      <p>Order Row</p>
      <OrderItems />
    </div>
  )
}
