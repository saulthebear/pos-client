import React, { useId } from "react"
import CategoryButton from "./CategoryButton"
import PropTypes from "prop-types"

export default function CategoriesSelect({ categories }) {
  const id = useId()
  const categoryButtons = categories.map((category) => {
    return <CategoryButton key={`${id}-${category._id}`} {...category} />
  })

  return <div className="flex w-full gap-2 flex-wrap">{categoryButtons}</div>
}

CategoriesSelect.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
}
