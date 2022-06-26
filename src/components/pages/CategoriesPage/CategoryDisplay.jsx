import React, { useId } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export default function CategoryDisplay({ categories }) {
  const id = useId()

  const categoryLinks = categories.map((category) => {
    return (
      <div key={`${id}-${category._id}`}>
        <Link to={`/categories/${category._id}`}>{category.name}</Link>
      </div>
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
}
