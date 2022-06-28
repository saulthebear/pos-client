import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAuthOptions } from "../../../helpers/utils"

import CategoryForm from "./CategoryForm"
import CategoryDisplay from "./CategoryDisplay"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [showCatForm, setShowCatForm] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/categories`,
          getAuthOptions()
        )
        setCategories(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = (e, form) => {
    e.preventDefault()
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/categories`,
        form,
        getAuthOptions()
      )
      .then((response) => {
        const newCategories = [...categories, response.data]
        setCategories(newCategories)
        setShowCatForm(false)
      })
      .catch(console.warn)
  }

  return (
    <>
      <p className="text-red-700">{error}</p>
      {showCatForm ? (
        <CategoryForm
          initialCatForm={categories}
          submitHandler={handleSubmit}
        />
      ) : (
        <CategoryDisplay
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <button onClick={() => setShowCatForm(!showCatForm)}>
        {showCatForm ? "Cancel" : "New"}
      </button>
    </>
  )
}
