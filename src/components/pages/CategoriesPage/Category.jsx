import React, { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"

import ColorIndicator from "../../ui/ColorIndicator"
import userColors from "../../../helpers/userColors"
import { Input } from "../../ui/Input"
import { ButtonSmall } from "../../ui/Button"

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
    <>
      <p>Name:</p>
      <button onClick={() => setIsEditingName(true)}>{name}</button>
    </>
  )

  const nameInput = (
    <>
      <Input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <ButtonSmall className="bg-plum-400 text-white" type="button" onClick={handleUpdateName}>
        <span>Done</span>
      </ButtonSmall>
      <ButtonSmall className="bg-transparent border-2 border-plum-700" type="button" onClick={() => setIsEditingName(false)}>
        Cancel
      </ButtonSmall>
    </>
  )

  const colorDisplay = (
    <>
      <>Color:</>
      <button onClick={() => setIsEditingColor(true)}>
        <ColorIndicator color={color} />
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
    <>
      <select
        onChange={(e) => setColorValue(e.target.value)}
        value={colorValue}
      >
        {colorOptions}
      </select>
      <ButtonSmall className="bg-plum-400 text-white" type="button" onClick={handleUpdateColor}>
        Done
      </ButtonSmall>
      <ButtonSmall className="bg-transparent border-2 border-plum-700" type="button" onClick={() => setIsEditingColor(false)}>
        Cancel
      </ButtonSmall>
    </>
  )

  return (
    <div className="grid grid-cols-5 p-3 bg-gray-200 rounded-md m-2 font-red-hat-display" key={`${id}-${_id}`}>
      <p>{isEditingName ? nameInput : nameDisplay}</p>
      <p>{isEditingColor ? colorInput : colorDisplay}</p>
      <ButtonSmall className="bg-red-700 text-white" onClick={() => handleDelete(_id)}>Delete</ButtonSmall>
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
