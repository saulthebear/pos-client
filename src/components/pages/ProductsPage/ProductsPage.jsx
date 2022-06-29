import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

import ProductsDisplay from "./ProductsDisplay"
import ProductForm from "./ProductForm"
import { getAuthOptions } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import Loading from "../../ui/Loading"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showProdForm, setShowProdForm] = useState(false)
  const [error, setError] = useState("")

  const { user, isUserLoading } = useAuth()

  if (isUserLoading) return <Loading />

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <div>You are not authorized to view this page.</div>
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          getAuthOptions()
        )
        setProducts(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategory = async () => {
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
    fetchCategory()
  }, [])

  const handleSubmit = (e, form) => {
    e.preventDefault()
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        form,
        getAuthOptions()
      )
      .then((response) => {
        const newProducts = [...products, response.data]
        setProducts(newProducts)
        setShowProdForm(false)
      })
      .catch((err) => {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      })
  }

  return (
    <>
      <p className="text-red-700">{error}</p>
      {showProdForm ? (
        <ProductForm
          initialProductForm={{
            name: "",
            code: "",
            price: 3,
            category: "",
          }}
          submitHandler={handleSubmit}
          categories={categories}
        />
      ) : (
        <ProductsDisplay
          products={products}
          setProducts={setProducts}
          categories={categories}
        />
      )}
      <div>
        <button onClick={() => setShowProdForm(!showProdForm)}>
          {showProdForm ? "Cancel" : "New"}
        </button>
      </div>
    </>
  )
}
