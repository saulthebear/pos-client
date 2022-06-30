import React, { useState } from "react"
import PropTypes from "prop-types"

import { AddButton } from "../../ui/Button"

import Category from "./Category"

export default function CategoryDisplay({ categories, setCategories, isOpen, setIsOpen }) {
  const [error, setError] = useState("")

  const categoryList = categories.map((category) => {
    return (
      <div key={`categoryDisplay-${category._id}`}>
        <Category
          categories={categories}
          setCategories={setCategories}
          {...category}
          setError={setError}
        />
      </div>
    )
  })
  return (
    <div>
      <p className="text-red-700">{error}</p>
      <div className="font-red-hat-display font-black text-3xl">
        <h1 className="text-3xl font-semibold mb-5">Categories</h1>
        <div>
          <AddButton className="bg-plum-500" onClick={() => setIsOpen(!isOpen)}>
            New
          </AddButton>
        </div>
        {categoryList}
      </div >
    </div >
  )
}

CategoryDisplay.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  setCategories: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}
