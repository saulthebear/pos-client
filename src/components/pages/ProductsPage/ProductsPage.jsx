import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import ProductsDisplay from "./ProductsDisplay"
import ProductForm from "./ProductForm"
export default function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt")
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          options
        )
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>ProductsPage</h1>
      <ProductsDisplay products={products} />
      <ProductForm />
    </div>
  )
}
