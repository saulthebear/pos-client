import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAuthOptions } from "../../../helpers/utils"
import { Navigate } from "react-router-dom"

// import CategoryForm from "./CategoryForm"
import CategoryDisplay from "./CategoryDisplay"
import { useAuth } from "../../../hooks/useAuth"
import Loading from "../../ui/Loading"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import { ButtonLarge } from "../../ui/Button"
import { PinkInput } from "../../ui/Input"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [showCatForm, setShowCatForm] = useState(false)
  const [error, setError] = useState("")

  const { user, isUserLoading } = useAuth()

  if (isUserLoading) return <Loading />

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <div>You are not authorized to view this page.</div>
  }

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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const initialCatForm = { categories }
  const [catForm, setCatForm] = useState(initialCatForm)

  return (
    <div className="p-5">
      <div>
        <p className="text-red-700">{error}</p>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalPanel>
            <ModalTitle>Add A Category</ModalTitle>
            <form onSubmit={e => handleSubmit(e, catForm, setCatForm)}>
              <PinkInput
                label="Name:"
                type="text"
                id="name"
                value={catForm.name}
                onChange={e => setCatForm({ ...catForm, name: e.target.value })}
              />
              <PinkInput
                label="Color:"
                type="text"
                id="color"
                value={catForm.color}
                onChange={e => setCatForm({ ...catForm, color: e.target.value })}
              />
              <ButtonLarge className="bg-plum-700" type="submit">Create</ButtonLarge>
            </form>
          </ModalPanel>
        </Modal>
        <CategoryDisplay
          categories={categories}
          setCategories={setCategories}
          isOpen={isModalOpen} setIsOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}
