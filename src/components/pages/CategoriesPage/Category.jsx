import React, { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"

import ColorIndicator from "../../ui/ColorIndicator"
import userColors from "../../../helpers/userColors"

export default function Category({
  _id,
  name,
  color,
  categories,
  setCategories,
  setError,
}) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingColor, setIsEditingColor] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const [colorValue, setColorValue] = useState(color)

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
    <button onClick={() => setIsEditingName(true)}>{name}</button>
  )

  const nameInput = (
    <>
      <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <button type="button" onClick={handleUpdateName}>
        <span>Done</span>
      </button>
      <button type="button" onClick={() => setIsEditingName(false)}>
        Cancel
      </button>
    </>
  )

  const colorDisplay = (
    <button onClick={() => setIsEditingColor(true)}>
      <ColorIndicator color={color} />
    </button>
  )
  const colorOptions = Object.keys(userColors).map((color) => {
    return (
      <option value={color} key={`${id}-color-${color}`}>
        {color}
      </option>
    )
  })

  const colorInput = (
    <>
      <select
        onChange={(e) => setColorValue(e.target.value)}
        value={colorValue}
      >
        {colorOptions}
      </select>
      <button type="button" onClick={handleUpdateColor}>
        Confirm
      </button>
      <button type="button" onClick={() => setIsEditingColor(false)}>
        Cancel
      </button>
    </>
  )

  return (
    <div key={`${id}-${_id}`}>
      <p>{isEditingName ? nameInput : nameDisplay}</p>
      <p>{isEditingColor ? colorInput : colorDisplay}</p>
      <button onClick={() => handleDelete(_id)}>Delete</button>
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
}
