import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"

import { getAuthOptions } from "../../../helpers/utils"
import { AddButton } from "../../ui/Button"
import Category from "./Category"
import Search from "../NewOrderPage/Search"
import Tooltip from "../../ui/Tooltip"

export default function CategoryDisplay({
  categories,
  setCategories,
  isOpen,
  setIsOpen,
}) {
  const [error, setError] = useState("")
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [filter, setFilter] = useState("")
  const [productsByCategory, setProductsByCategory] = useState({})

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    // if (filter === "") {
    //   setFilteredCategories(categories)
    //   return
    // }

    // const filteredCategories = categories.filter((category) =>
    //   category.name.toLowerCase().includes(e.target.value.toLowerCase())
    // )
    // setFilteredCategories(filteredCategories)
  }

  // Fetch products by category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          getAuthOptions()
        )
        const productsWithCategories = response.data.filter(
          (product) => product.category
        )
        const map = {}

        productsWithCategories.forEach((product) => {
          if (!map[product.category._id]) {
            map[product.category._id] = []
          }
          map[product.category._id].push(product)
        })

        setProductsByCategory(map)
      } catch (error) {
        console.warn("Could not fetch products", error)
      }
    }
    fetchProducts()
  }, [])

  // Sync displayed categories with filtered categories
  // Ensure categories are shown when the filter is empty
  useEffect(() => {
    if (filter === "") {
      setFilteredCategories(categories)
      return
    }

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(filter)
    )
    setFilteredCategories(filteredCategories)
  }, [filter, categories])

  const categoryList = filteredCategories.map((category) => {
    return (
      <div key={`categoryDisplay-${category._id}`}>
        <Category
          categories={categories}
          setCategories={setCategories}
          {...category}
          setError={setError}
          products={productsByCategory[category._id]}
        />
      </div>
    )
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5">Categories</h1>
      <p className="text-red-700">{error}</p>
      <div className="flex justify-between mb-5">
        {/* filter */}
        <Search
          className="grow"
          type="text"
          placeholder="Filter categories..."
          value={filter}
          onChange={handleFilterChange}
        />
        {/* Add new category button */}
        <div className="mx-6">
          <Tooltip.Container>
            <Tooltip.Message offset="bottom-5">Add a Category</Tooltip.Message>
            <AddButton
              className="bg-plum-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              New
            </AddButton>
          </Tooltip.Container>
        </div>
      </div>
      {/* headings */}
      <div className="font-red-hat-display font-black text-3xl grid grid-cols-3">
        <span>Name</span>
        <span>Color</span>
      </div>
      {/* category list */}
      <div className="font-medium text-xl space-y-3">{categoryList}</div>
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
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}
