import axios from "axios"
import React, { useState, useEffect } from "react"
import { getAuthOptions } from "../../../helpers/utils"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import ItemsPanel from "./ItemsPanel"
import LineItemsPanel from "./LineItemsPanel"

export default function NewOrderPage() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

  // fetch categories and items from server
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/products`,
          getAuthOptions()
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

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="h-full grid grid-cols-3">
      <div className="col-span-2">
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <ModalPanel>
            <ModalTitle>Modal Title</ModalTitle>
          </ModalPanel>
        </Modal>
        <ItemsPanel items={items} categories={categories} />
      </div>
      <LineItemsPanel />
    </div>
  )
}
