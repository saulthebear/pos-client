import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import ProductsDisplay from "./ProductsDisplay"
import ProductForm from "./ProductForm"
import { getAuthOptions } from "../../../helpers/utils"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [showProdForm, setShowProdForm] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          getAuthOptions()
        )
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleSubmit = (e, form) => {
    e.preventDefault()
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/products`,
      form,
      getAuthOptions()
    )
      .then(response => {
        const newProducts = [...products, response.data]
        setProducts(newProducts)
        setShowProdForm(false)
      })
      .catch(console.warn)
  }

  return (
    <>
      {
        showProdForm ?
          <ProductForm
            initialProductForm={products}
            submitHandler={handleSubmit}
          /> :
          <ProductsDisplay
            products={products}
            setProducts={setProducts}
          />
      }
      <button
        onClick={() => setShowProdForm(!showProdForm)}
      >
        {showProdForm ? 'Cancel' : 'New'}
      </button>
    </>
  )
}
