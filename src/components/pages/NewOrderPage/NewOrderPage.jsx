import axios from "axios"
import React, { useState, useEffect } from "react"
import ItemsPanel from "./ItemsPanel"
import LineItemsPanel from "./LineItemsPanel"

export default function NewOrderPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

  // fetch categories and items from server
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    const options = {
      headers: {
        Authorization: token,
      },
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          options
        )
        console.log(response.data)
        setItems(response.data)
      } catch (error) {
        console.log("Error fetching products", error)
      }
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/categories`,
          options
        )
        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchItems()
    fetchCategories()
  }, [])

  return (
    <div className="h-full grid grid-cols-3">
      <div className="col-span-2">
        <ItemsPanel items={items} categories={categories} />
      </div>
      <LineItemsPanel />
    </div>
  )
}
