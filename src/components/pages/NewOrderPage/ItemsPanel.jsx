import React from "react"
import Search from "./Search"
import CategoriesSelect from "./CategoriesSelect"
import ItemsSelect from "./ItemsSelect"
import PropTypes from "prop-types"
import { useEffect } from "react"

export default function ItemsPanel({ items, categories, onAddLineItem }) {
  const [selectedCategory, setSelectedCategory] = React.useState("")
  const [filterTerm, setFilterTerm] = React.useState("")
  const [filteredItems, setFilteredItems] = React.useState(items)

  useEffect(() => {
    let categoryItems = items
    if (selectedCategory) {
      categoryItems = items.filter((item) => {
        return item.category && item.category._id === selectedCategory
      })
    }

    setFilteredItems(categoryItems)

    if (filterTerm) {
      const filteredItems = categoryItems.filter((item) => {
        return item.name.toLowerCase().includes(filterTerm.toLowerCase())
      })
      setFilteredItems(filteredItems)
    }

    // const filteredItems = categoryItems.filter((item) => {
    //   return item.name.toLowerCase().includes(filterTerm.toLowerCase())
    // })
  }, [selectedCategory, filterTerm, items])

  return (
    <div className="p-4 flex flex-col gap-5">
      <Search
        type="text"
        placeholder="filter items..."
        onChange={(e) => setFilterTerm(e.target.value)}
      />
      <CategoriesSelect
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ItemsSelect items={filteredItems} onAddLineItem={onAddLineItem} />
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
