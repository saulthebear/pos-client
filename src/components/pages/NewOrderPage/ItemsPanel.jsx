import React from "react"
import Search from "./Search"
import CategoriesSelect from "./CategoriesSelect"
import ItemsSelect from "./ItemsSelect"
import PropTypes from "prop-types"

export default function ItemsPanel({ items, categories, onAddLineItem }) {
  return (
    <div className="p-4 flex flex-col gap-5">
      <Search type="text" placeholder="filter items..." />
      <CategoriesSelect categories={categories} />
      <ItemsSelect items={items} onAddLineItem={onAddLineItem} />
    </div>
  )
}

ItemsPanel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  onAddLineItem: PropTypes.func.isRequired,
}
