import React, { useId, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"

import { Input } from "../../ui/Input"
import {
  ButtonSmall,
  ButtonLarge,
  AddButton,
  EditableDisplayButton,
} from "../../ui/Button"
import Search from "../NewOrderPage/Search"
import Tooltip from "../../ui/Tooltip"
import { formatCurrency } from "../../../helpers/utils"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"

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
      const body = { price: priceValue * 100 }
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
        price: parseFloat(priceValue) * 100,
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
    <>
      <EditableDisplayButton onClick={() => setIsEditingName(true)}>
        {name}
      </EditableDisplayButton>
    </>
  )

  const nameInput = (
    <>
      <Input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <ButtonSmall
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdateName}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700 text-plum-700"
        type="button"
        onClick={() => setIsEditingName(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const codeDisplay = (
    <>
      <EditableDisplayButton onClick={() => setIsEditingCode(true)}>
        {code}
      </EditableDisplayButton>
    </>
  )

  const codeInput = (
    <>
      <Input value={codeValue} onChange={(e) => setCodeValue(e.target.value)} />
      <ButtonSmall
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdateCode}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700 text-plum-700"
        type="button"
        onClick={() => setIsEditingCode(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const priceDisplay = (
    <>
      <EditableDisplayButton onClick={() => setIsEditingPrice(true)}>
        {formatCurrency(price)}
      </EditableDisplayButton>
    </>
  )

  const priceInput = (
    <>
      <Input
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
      />
      <ButtonSmall
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdatePrice}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700 text-plum-700"
        type="button"
        onClick={() => setIsEditingPrice(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const categoryDisplay = (
    <>
      <EditableDisplayButton onClick={() => setIsEditingCategory(true)}>
        {category ? (
          category.name
        ) : (
          <span className="text-gray-400">No Category</span>
        )}
      </EditableDisplayButton>
    </>
  )

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
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdateCategory}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700 text-plum-700"
        type="button"
        onClick={() => setIsEditingCategory(false)}
      >
        Cancel
      </ButtonSmall>
    </>
  )

  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <div>
        <p className="text-red-700 font-red-hat-display">{error}</p>
      </div>
      <div
        className="grid grid-cols-5 p-3 border-b-2 border-plum-900 pb-2 font-red-hat-display"
        key={`${id}-${_id}`}
      >
        <div>{isEditingName ? nameInput : nameDisplay}</div>
        <div>{isEditingCode ? codeInput : codeDisplay}</div>
        <div>{isEditingPrice ? priceInput : priceDisplay}</div>
        <div>
          {<div>{isEditingCategory ? categoryInput : categoryDisplay}</div>}
        </div>
        <div className="p-5">
          <Modal isOpen={isDeleting} setIsOpen={setIsDeleting}>
            <ModalPanel>
              <ModalTitle>
                <span className="material-symbols-rounded">warning</span>Confirm
                <span className="material-symbols-rounded">warning</span>
              </ModalTitle>
              <div className="flex flex-col flex-1 justify-center items-center space-y-6 mb-5 space-evenly">
                <div className="flex flex-col items-center space-y-6 mb-5">
                  <span className="font-semibold text-xl mb-5">
                    Are you sure you want to delete...{name}?
                  </span>
                  <div className="flex justify-between space-x-6">
                    <ButtonLarge
                      className="bg-amber-600 text-white w-fit"
                      onClick={() => setIsDeleting(false)}
                    >
                      Cancel
                      {/* {isModalOpen ? "Cancel" : "New"} */}
                    </ButtonLarge>
                    <ButtonLarge
                      className="bg-red-700 text-white w-fit"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </ButtonLarge>
                  </div>
                </div>
              </div>
            </ModalPanel>
          </Modal>
          <ButtonSmall
            className="bg-red-700 text-white w-fit"
            onClick={() => setIsDeleting(!isDeleting)}
          >
            Delete
            {/* {isModalOpen ? "Cancel" : "New"} */}
          </ButtonSmall>
        </div>
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

export default function ProductsDisplay({
  products,
  setProducts,
  categories,
  isOpen,
  setIsOpen,
}) {
  const id = useId()
  const [filter, setFilter] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    if (filter === "") {
      setFilteredProducts(products)
      return
    }
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filter)
    )
    setFilteredProducts(filteredProducts)
  }, [filter, products])

  const productList = filteredProducts.map((product) => {
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
    <div>
      <h1 className="text-3xl font-semibold mb-5">Products</h1>
      <div className="flex justify-between mb-5">
        <Search
          className="grow"
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={handleFilterChange}
        />
        <div className="mx-6">
          <Tooltip.Container>
            <Tooltip.Message offset="bottom-5">Add a Product</Tooltip.Message>
            <AddButton
              className="bg-plum-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              New
              {/* {isModalOpen ? "Cancel" : "New"} */}
            </AddButton>
          </Tooltip.Container>
        </div>
      </div>
      <div className="font-red-hat-display font-black text-3xl grid grid-cols-5">
        <span>Name</span>
        <span>Code</span>
        <span>Price</span>
        <span>Category</span>
      </div>
      <div className="font-medium text-xl space-y-3">{productList}</div>
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
      _id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}
