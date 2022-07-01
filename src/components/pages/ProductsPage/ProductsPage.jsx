import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

import ProductsDisplay from "./ProductsDisplay"
// import ProductForm from "./ProductForm"
import { getAuthOptions } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import { ButtonLarge, ModalButton } from "../../ui/Button"
import { PinkInput, PinkSelect } from "../../ui/Input"
import AuthService from "../../../helpers/authServices"

export default function ProductsPage() {
  const initialProductForm = {
    name: "",
    code: "",
    price: 0,
    category: "",
  }
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [productForm, setProductForm] = useState(initialProductForm)
  const [error, setError] = useState("")
  const [formError, setFormError] = useState("")

  // const { user, isUserLoading } = useAuth()

  // if (isUserLoading) return <Loading />
  const user = AuthService.getCurrentUser()

  // let user = null
  // const token = localStorage.getItem("jwt")
  // if (token) {
  //   user = jwt_decode(token)
  // }

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
        setProductForm({ ...productForm, category: response.data[0]._id })
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

  const validateForm = () => {
    if (productForm.name == "") {
      setFormError("Name is required")
      return false
    }
    const priceNumber = parseFloat(productForm.price)
    if (isNaN(priceNumber) || typeof priceNumber !== "number") {
      setFormError("Price is required")
      return false
    }
    setFormError("")
    return true
  }

  const handleSubmit = (e, form) => {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) return

    const body = {
      ...form,
      price: parseFloat(form.price) * 100,
    }
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/products`,
        body,
        getAuthOptions()
      )
      .then((response) => {
        const newCategory = categories.find(
          (category) => category._id === form.category
        )
        const newProduct = {
          ...response.data,
          category: newCategory,
        }
        setProducts([...products, newProduct])
        setProductForm(initialProductForm)
        // const newProducts = [...products, response.data]
        // setProducts(newProducts)
        // setShowProdForm(false)
      })
      .catch((err) => {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      })
      .finally(() => {
        setIsModalOpen(false)
      })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <div>
        <p className="text-red-700">{error}</p>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <ModalPanel setIsOpen={setIsModalOpen}>
          <ModalTitle>Add A Product</ModalTitle>
          <div className="flex flex-col items-center space-y-2 mb-5">
            {formError && (
              <p className="text-red-900 bg-red-300 px-5 py-2 rounded-md">
                {formError}
              </p>
            )}
            <form
              onSubmit={(e) => handleSubmit(e, productForm, setProductForm)}
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <PinkInput
                    label="Name:"
                    type="text"
                    id="name"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                  />
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center space-x-8">
                      <PinkInput
                        label="Code:"
                        type="text"
                        id="code"
                        value={productForm.code}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            code: e.target.value,
                          })
                        }
                      />
                      <PinkInput
                        label="Price:"
                        type="number"
                        step="0.01"
                        id="price"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <PinkSelect
                    value={productForm.category}
                    label="Category"
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                  >
                    {categories.map((category) => {
                      return (
                        <option
                          value={category._id}
                          key={`categoryOption-${category._id}`}
                        >
                          {category.name}
                        </option>
                      )
                    })}
                  </PinkSelect>
                </div>
              </div>
              {/* <label htmlFor="category">Category:</label>
              <select
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                value={productForm.category}
              >
                {categories.map((category) => {
                  return (
                    <option
                      value={category._id}
                      key={`categoryOption-${category._id}`}
                    >
                      {category.name}
                    </option>
                  )
                })}
              </select> */}
              <div className="flex justify-end mt-5">
                <ModalButton type="submit">Create</ModalButton>
              </div>
            </form>
          </div>
        </ModalPanel>
      </Modal>
      <ProductsDisplay
        products={products}
        setProducts={setProducts}
        categories={categories}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      {/* {showProdForm ? (
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
      )} */}
    </div>
  )
}
