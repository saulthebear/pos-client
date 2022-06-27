import React, { useId, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { getAuthOptions } from "../../../helpers/utils"
import axios from "axios"
import PropTypes from "prop-types"

import ColorIndicator from "../../ui/ColorIndicator"
import userColors from "../../../helpers/userColors"

function Category({ _id, name, color, categories, setCategories }) {
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
    } catch (error) {
      console.log(error, 'trouble updating cat name')
    }
  }

  const handleUpdateColor = async () => {
    try {
      const body = {
        color: colorValue
      }
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/categories/${_id}`, body, getAuthOptions())
      setIsEditingColor(false)
      const categoriesIds = categories.map((category) => category._id)
      const index = categoriesIds.indexOf(_id)
      const updatedCategories = [...categories]
      updatedCategories[index] = { ...categories[index], color: colorValue }
      setCategories(updatedCategories)
    } catch (error) {
      // TODO: inform user of error
      console.error('Could not update color', error)
      setIsEditingColor(false)
    }
  }
  const handleDelete = (id) => {
    axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/categories/${id}`,
      getAuthOptions()
    )
      .then(response => {
        navigate('/admin/categories')
        console.log('Before filter:', categories.length)
        const updatedCats = categories.filter(cat => cat._id !== id)
        console.log('After filter:', updatedCats.length)
        console.log(updatedCats)
        setCategories(updatedCats)
      })
      .catch(console.warn)
  }

  const nameDisplay = (<button onClick={() => setIsEditingName(true)}>{name}</button>)
  const nameInput = (
    <>
      <input
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <button type='button' onClick={handleUpdateName}>
        <span>Done</span>
      </button>
      <button type='button' onClick={() => setIsEditingName(false)}>Cancel</button>
    </>
  )

  const colorDisplay = (<button onClick={() => setIsEditingColor(true)}><ColorIndicator color={color} /></button>)
  const colorOptions = Object.keys(userColors).map((color) => {
    return (<option value={color} key={`${id}-color-${color}`}>{color}</option>)
  })
  const colorInput = (<>
    <select onChange={(e) => setColorValue(e.target.value)} value={colorValue} >
      {colorOptions}
    </select>
    <button type="button" onClick={handleUpdateColor}>Confirm</button>
    <button type="button" onClick={() => setIsEditingColor(false)}>Cancel</button>
  </>)

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
      color: PropTypes.string.isRequired
    })
  ),
  setCategories: PropTypes.func,
}

export default function CategoryDisplay({ categories, setCategories }) {
  const id = useId()

  const categoryLinks = categories.map((category) => {
    return (
      <>
        <Category categories={categories} setCategories={setCategories} {...category} />
      </>
    )
  })
  return (
    <div>
      <h1>CategoryDisplay</h1>
      {categoryLinks}
    </div>
  )
}

CategoryDisplay.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  setCategories: PropTypes.func,
}
