import React, { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"

import { Input } from "../../ui/Input"
import { ButtonSmall } from "../../ui/Button"

function Product({
  _id,
  name,
  code,
  price,
  products,
  category,
  setProducts,
  categories,
}) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingCode, setIsEditingCode] = useState(false)
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const [codeValue, setCodeValue] = useState(code)
  const [priceValue, setPriceValue] = useState(price)
  const [categoryValue, setCategoryValue] = useState(category)
  const [error, setError] = useState("")

  const id = useId()
  const navigate = useNavigate()

  const handleUpdateName = async () => {
    try {
      const body = { name: nameValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/products/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingName(false)
      const productsIds = products.map((product) => product._id)
      const index = productsIds.indexOf(_id)
      const updatedProducts = [...products]
      updatedProducts[index] = { ...products[index], name: nameValue }
      setProducts(updatedProducts)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
      setIsEditingName(false)
    }
  }

  const handleUpdateCode = async () => {
    try {
      const body = { code: codeValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/products/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingCode(false)
      const productsIds = products.map((product) => product._id)
      const index = productsIds.indexOf(_id)
      const updatedProducts = [...products]
      updatedProducts[index] = { ...products[index], code: codeValue }
      setProducts(updatedProducts)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
      setIsEditingCode(false)
    }
  }

  const handleUpdatePrice = async () => {
    try {
      const body = { price: priceValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/products/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingPrice(false)
      const productsIds = products.map((product) => product._id)
      const index = productsIds.indexOf(_id)
      const updatedProducts = [...products]
      updatedProducts[index] = {
        ...products[index],
        price: parseFloat(priceValue),
      }
      setProducts(updatedProducts)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
      setIsEditingPrice(false)
    }
  }

  const handleUpdateCategory = async () => {
    try {
      const body = { category: categoryValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/products/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingCategory(false)
      const productsIds = products.map((product) => product._id)
      const index = productsIds.indexOf(_id)
      const updatedProducts = [...products]

      const newCategory = categories.filter(
        (category) => category._id === categoryValue
      )[0]

      updatedProducts[index] = { ...products[index], category: newCategory }
      setProducts(updatedProducts)
    } catch (error) {
      console.log(error, "trouble updated product code")
      setIsEditingCategory(false)
    }
  }

  const handleDelete = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
        getAuthOptions()
      )
      .then((response) => {
        navigate("/admin/products")
        const updatedProducts = products.filter((product) => product._id !== id)
        setProducts(updatedProducts)
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

  const nameDisplay = (
    <button onClick={() => setIsEditingName(true)}>{name}</button>
  )

  const nameInput = (
    <>
      <Input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <ButtonSmall
        className="bg-plum-600"
        type="button"
        onClick={handleUpdateName}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-plum-300"
        type="button"
        onClick={() => setIsEditingName(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const codeDisplay = (
    <>
      <p>Code:</p>
      <button onClick={() => setIsEditingCode(true)}>{code}</button>
    </>
  )

  const codeInput = (
    <>
      <Input value={codeValue} onChange={(e) => setCodeValue(e.target.value)} />
      <ButtonSmall
        className="bg-plum-600"
        type="button"
        onClick={handleUpdateCode}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-plum-300"
        type="button"
        onClick={() => setIsEditingCode(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const priceDisplay = (
    <>
      <p>Price:</p>
      <button onClick={() => setIsEditingPrice(true)}>{price}</button>
    </>
  )

  const priceInput = (
    <>
      <Input
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
      />
      <ButtonSmall
        className="bg-plum-600"
        type="button"
        onClick={handleUpdatePrice}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-plum-300"
        type="button"
        onClick={() => setIsEditingPrice(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  let categoryDisplay = ""
  if (category) {
    categoryDisplay = (
      <>
        <p></p>
        <button onClick={() => setIsEditingCategory(true)}>
          {category.name}
        </button>
      </>
    )
  }

  const categoryOptions = categories.map((category) => {
    return (
      <option value={category._id} key={`${id}-category-${category._id}`}>
        {category.name}
      </option>
    )
  })

  const categoryInput = (
    <>
      <select
        onChange={(e) => setCategoryValue(e.target.value)}
        value={categoryValue}
      >
        {categoryOptions}
      </select>
      <ButtonSmall
        className="bg-plum-600"
        type="button"
        onClick={handleUpdateCategory}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-plum-300"
        type="button"
        onClick={() => setIsEditingCategory(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  return (
    <>
      <p className="text-red-700">{error}</p>
      <div className="grid grid-cols-5 p-3" key={`${id}-${_id}`}>
        <p>{isEditingName ? nameInput : nameDisplay}</p>
        <p>{isEditingCode ? codeInput : codeDisplay}</p>
        <p>{isEditingPrice ? priceInput : priceDisplay}</p>
        <div>
          {category && (
            <p>{isEditingCategory ? categoryInput : categoryDisplay}</p>
          )}
        </div>
        <ButtonSmall className="bg-plum-200" onClick={() => handleDelete(_id)}>
          Delete
        </ButtonSmall>
      </div>
    </>
  )
}

Product.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
      }),
    })
  ),
  setProducts: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
}

export default function ProductsDisplay({ products, setProducts, categories }) {
  const id = useId()

  const productList = products.map((product) => {
    return (
      <div key={`${id}-product-${product._id}`}>
        <Product
          products={products}
          setProducts={setProducts}
          {...product}
          categories={categories}
        />
      </div>
    )
  })
  return (
    <div className="p-5">
      <h1 className="font-red-hat-display font-black text-3xl">Products</h1>
      {productList}
    </div>
  )
}

ProductsDisplay.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  setProducts: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
}
