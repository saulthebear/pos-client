import React, { useId } from "react"
import CategoryButton from "./CategoryButton"
import PropTypes from "prop-types"

export default function CategoriesSelect({
  categories,
  setSelectedCategory,
  selectedCategory,
}) {
  const id = useId()
  const categoryButtons = categories.map((category) => {
    return (
      <CategoryButton
        key={`${id}-${category._id}`}
        {...category}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    )
  })

  const noCategorySelected = selectedCategory === ""

  return (
    <div className="flex w-full gap-2 flex-wrap">
      <button
        onClick={() => setSelectedCategory("")}
        className={`${
          noCategorySelected ? "bg-plum-800" : "bg-plum-600"
        }  w-32 rounded-lg text-white font-semibold px-5 py-3 flex items-center justify-center shadow-md`}
      >
        All
      </button>
      {categoryButtons}
    </div>
  )
}

CategoriesSelect.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
}
