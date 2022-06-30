import React, { useState } from "react"
import PropTypes from "prop-types"

import Category from "./Category"
export default function CategoryDisplay({ categories, setCategories }) {
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
      {categoryList}
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
