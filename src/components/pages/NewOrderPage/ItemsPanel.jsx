import React from "react"
import CategoriesSelect from "./CategoriesSelect"
import Search from "./Search"

export default function ItemsPanel() {
  return (
    <div>
      <h2>ItemsPanel</h2>
      <Search />
      <CategoriesSelect />
    </div>
  )
}
