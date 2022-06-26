import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import CategoryForm from "./CategoryForm"
import CategoryDisplay from "./CategoryDisplay"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt")
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/categories`,
          options
        )
        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])
  console.log("my server url is", process.env.REACT_APP_SERVER_URL)
  return (
    <div>
      <h1>CategoriesPage</h1>
      <CategoryDisplay categories={categories} />
      <CategoryForm />
    </div>
  )
}
