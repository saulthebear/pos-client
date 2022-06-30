import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAuthOptions } from "../../../helpers/utils"
import { Navigate } from "react-router-dom"

// import CategoryForm from "./CategoryForm"
import CategoryDisplay from "./CategoryDisplay"
import { useAuth } from "../../../hooks/useAuth"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import { ButtonLarge, ModalButton } from "../../ui/Button"
import { PinkInput, PinkSelect } from "../../ui/Input"
import userColors from "../../../helpers/userColors"
import AuthService from "../../../helpers/authServices"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [catForm, setCatForm] = useState({
    name: "",
    color: Object.keys(userColors)[0],
  })

  // const { user, isUserLoading } = useAuth()

  // if (isUserLoading) return <Loading />

  const user = AuthService.getCurrentUser()

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
      })
      .catch(console.warn)
      .finally(() => {
        setCatForm({ name: "", color: "" })
        setIsModalOpen(false)
      })
  }

  return (
    <div className="p-5">
      <div>
        <p className="text-red-700">{error}</p>
        {/* Add category modal */}
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalPanel>
            <ModalTitle>Add A Category</ModalTitle>
            <form
              onSubmit={(e) => handleSubmit(e, catForm, setCatForm)}
              className="flex flex-col justify-between"
            >
              <PinkInput
                label="Name:"
                type="text"
                id="name"
                value={catForm.name}
                onChange={(e) =>
                  setCatForm({ ...catForm, name: e.target.value })
                }
              />
              {/* <PinkInput
                label="Color:"
                type="text"
                id="color"
                value={catForm.color}
                onChange={(e) =>
                  setCatForm({ ...catForm, color: e.target.value })
                }
              /> */}
              <PinkSelect
                value={catForm.color}
                onChange={(e) =>
                  setCatForm({ ...catForm, color: e.target.value })
                }
                className="bg-plum-100 text-plum-800 rounded-sm shadow-inner hover:bg-plum-200 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-plum-500 px-4 py-2 placeholder:text-plum-400"
                label="Color:"
              >
                {Object.keys(userColors).map((color) => (
                  <option key={`new-category-color-${color}`} value={color}>
                    {color}
                  </option>
                ))}
              </PinkSelect>
              <div className="flex justify-end mt-5">
                <ModalButton type="submit">Create</ModalButton>
              </div>
            </form>
          </ModalPanel>
        </Modal>
        <CategoryDisplay
          categories={categories}
          setCategories={setCategories}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      </div>
    </div>
  )
}
