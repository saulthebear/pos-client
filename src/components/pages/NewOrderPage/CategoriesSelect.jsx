import React from "react"
import CategoryButton from "./CategoryButton"

const categories = [
  {
    id: 2,
    name: "Food",
    color: "green",
  },
  {
    id: 3,
    name: "Snacks",
    color: "blue",
  },
  {
    id: 4,
    name: "Desserts",
    color: "purple",
  },
  {
    id: 5,
    name: "Drinks",
    color: "yellow",
  },
]

export default function CategoriesSelect() {
  const categoryButtons = categories.map((category) => {
    return <CategoryButton key={category.id} {...category} />
  })

  return <div className="flex w-full gap-2 flex-wrap">{categoryButtons}</div>
}
