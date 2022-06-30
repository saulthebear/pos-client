import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

import ProductsDisplay from "./ProductsDisplay"
// import ProductForm from "./ProductForm"
import { getAuthOptions } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import Loading from "../../ui/Loading"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import { ButtonSmall, ButtonLarge } from "../../ui/Button"
import { PinkInput } from "../../ui/Input"

export default function ProductsPage() {
  const initialProductForm = {
    name: "",
    code: "",
    price: 3,
    category: "",
  }
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showProdForm, setShowProdForm] = useState(false)
  const [productForm, setProductForm] = useState(initialProductForm)
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

  const [isModalOpen, setIsModalOpen] = useState(true)


  return (
    <>
      <div>
        <p className="text-red-700">{error}</p>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <ModalPanel>
          <ModalTitle>Add A Product</ModalTitle>
          <div className="flex flex-col items-center space-y-2" mb-5>
            <h1>ProductForm</h1>
            <form
              onSubmit={(e) => handleSubmit(e, productForm, setProductForm)}
            >
              <div className="flex justify-evenly">
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
                  <PinkInput
                    label="Code:"
                    type="text"
                    id="code"
                    value={productForm.code}
                    onChange={(e) =>
                      setProductForm({ ...productForm, code: e.target.value })
                    }
                  />
                </div>
              </div>
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
              <label htmlFor="category">Category:</label>
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
              </select>
              <ButtonLarge className="bg-plum-700" type="submit">Create</ButtonLarge>
            </form>
          </div>
        </ModalPanel>
      </Modal>
      <ProductsDisplay
        products={products}
        setProducts={setProducts}
        categories={categories}
        isOpen={isModalOpen} setIsOpen={setIsModalOpen}
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
    </>
  )
}
