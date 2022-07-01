import React, { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatCurrency, getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"
import { productShape } from "../../../helpers/propTypes"

import ColorIndicator from "../../ui/ColorIndicator"
import userColors from "../../../helpers/userColors"
import { Input } from "../../ui/Input"
import {
  ButtonLarge,
  ButtonSmall,
  CancelButton,
  DoneButton,
  EditableDisplayButton,
} from "../../ui/Button"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"

export default function Category({
  _id,
  name,
  color,
  categories,
  setCategories,
  setError,
  products,
}) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingColor, setIsEditingColor] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const [colorValue, setColorValue] = useState(color)
  const [isExpanded, setIsExpanded] = useState(false)

  const id = useId()
  const navigate = useNavigate()

  const handleUpdateName = async () => {
    try {
      const body = { name: nameValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/categories/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingName(false)
      const categoriesIds = categories.map((category) => category._id)
      const index = categoriesIds.indexOf(_id)
      const updatedCategories = [...categories]
      updatedCategories[index] = { ...categories[index], name: nameValue }
      setCategories(updatedCategories)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleUpdateColor = async () => {
    try {
      const body = {
        color: colorValue,
      }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/categories/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditingColor(false)
      const categoriesIds = categories.map((category) => category._id)
      const index = categoriesIds.indexOf(_id)
      const updatedCategories = [...categories]
      updatedCategories[index] = { ...categories[index], color: colorValue }
      setCategories(updatedCategories)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
      setIsEditingColor(false)
    }
  }

  const handleDelete = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/categories/${id}`,
        getAuthOptions()
      )
      .then((response) => {
        navigate("/admin/categories")
        const updatedCats = categories.filter((cat) => cat._id !== id)
        setCategories(updatedCats)
      })
      .catch(console.warn)
  }

  const nameDisplay = (
    <>
      <EditableDisplayButton onClick={() => setIsEditingName(true)}>
        {name}
      </EditableDisplayButton>
      {/* <button onClick={() => setIsEditingName(true)}>{name}</button> */}
    </>
  )

  const nameInput = (
    <>
      <div className="flex">
        <Input
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <div className="ml-2 flex">
          <DoneButton onClick={handleUpdateName} />
          <CancelButton
            onClick={() => {
              setNameValue(name)
              setIsEditingName(false)
            }}
          />
        </div>
      </div>
      {/* <Input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <ButtonSmall
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdateName}
      >
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700"
        type="button"
        onClick={() => setIsEditingName(false)}
      >
        Cancel
      </ButtonSmall> */}
    </>
  )

  const colorDisplay = (
    <>
      <button
        onClick={() => setIsEditingColor(true)}
        className="flex justify-center items-center gap-2 capitalize"
      >
        <ColorIndicator color={color} />
        <span>{color}</span>
        <span className="material-symbols-rounded font-medium ml-3">edit</span>
      </button>
    </>
  )
  const colorOptions = Object.keys(userColors).map((color) => {
    return (
      <option value={color} key={`${id}-color-${color}`}>
        {color}
      </option>
    )
  })

  const colorInput = (
    <div className="flex">
      <select
        onChange={(e) => setColorValue(e.target.value)}
        value={colorValue}
        className="capitalize"
      >
        {colorOptions}
      </select>
      <div className="flex ml-2">
        <DoneButton type="button" onClick={handleUpdateColor} />
        <CancelButton
          type="button"
          onClick={() => {
            setIsEditingColor(false)
            setColorValue(color)
          }}
        />
      </div>
      {/* <ButtonSmall
        className="bg-plum-400 text-white"
        type="button"
        onClick={handleUpdateColor}
      >
        Done
      </ButtonSmall>
      <ButtonSmall
        className="bg-transparent border-2 border-plum-700"
        type="button"
        onClick={() => setIsEditingColor(false)}
      >
        Cancel
      </ButtonSmall> */}
    </div>
  )

  // Products list
  let productList = <div className="ml-10 font-normal">No products found.</div>
  if (products && products.length > 0) {
    productList = products.map((product) => {
      return (
        <div
          key={`${id}-product-${product._id}`}
          className="grid grid-cols-3 font-normal"
        >
          <div className="flex items-center">
            <span className="mr-2">
              <ColorIndicator color={color} />
            </span>
            <span>{product.name}</span>
          </div>
          <div>({product.code})</div>
          <div>{formatCurrency(product.price)}</div>
        </div>
      )
    })
  }

  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className=" pb-2 pt-4 px-2">
      <div className="grid grid-cols-3 border-b-2 border-plum-900 pb-2">
        <p className="flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center"
          >
            <span className="material-symbols-rounded">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
          {isEditingName ? nameInput : nameDisplay}
        </p>
        <p className="flex items-center">
          {isEditingColor ? colorInput : colorDisplay}
        </p>
        <div className="flex gap-1 items-center">
          <ButtonSmall
            className="bg-plum-600 text-white w-fit font-normal h-fit"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Less" : "More"}
          </ButtonSmall>
          <div className="p-5">
            <Modal isOpen={isDeleting} setIsOpen={setIsDeleting}>
              <ModalPanel setIsOpen={setIsDeleting}>
                <ModalTitle>
                  <span className="material-symbols-rounded">warning</span>
                  Confirm
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
      </div>

      {isExpanded && (
        <div className=" bg-slate-200 w-full px-10 py-5 rounded-b-lg">
          {productList}
        </div>
      )}
    </div>
  )
}

Category.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  setCategories: PropTypes.func,
  setError: PropTypes.func,
  products: PropTypes.arrayOf(productShape),
}
