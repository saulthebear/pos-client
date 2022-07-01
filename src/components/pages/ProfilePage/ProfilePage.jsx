import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { getAuthOptions } from "../../../helpers/utils"
import AuthService from "../../../helpers/authServices"
import UserIcon from "../../ui/UserIcon"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"
import { PinkInput } from "../../ui/Input"
import { ButtonLarge, ModalButton } from "../../ui/Button"

export default function Profile() {
  // const { user: currentUser } = useAuth()
  const currentUser = AuthService.getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  const [form, setForm] = useState({
    username: currentUser.username,
    password: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  // useEffect for getting the user data and checking auth

  const handleSubmit = async (e, form) => {
    e.preventDefault()
    try {
      let body = {
        username: form.username,
      }

      if (form.password) {
        body.password = form.password
      }

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${currentUser.id}`,
        body,
        getAuthOptions()
      )

      setForm(response.data)
      setIsEditing(false)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }
  return (
    <div className="p-5">
      <p className="text-red-700">{error}</p>
      {/* <h1 className="text-3xl font-semibold mb-5">Profile Page</h1> */}
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="text-3xl mb-7">Welcome, {currentUser.username}.</div>
        <div className="bg-slate-200 rounded-lg w-fit p-10 flex flex-col items-center gap-5">
          <p className="font-semibold text-xl">Permissions:</p>
          <div className="text-lg">
            {currentUser.role === "cashier" && (
              <>
                <UserIcon isAdmin={false} />
                You are a Cashier
              </>
            )}
            {currentUser.role === "admin" && (
              <>
                <UserIcon isAdmin={true} />
                You are an Admin
              </>
            )}
            {currentUser.role === "unverified" && (
              <>
                <p>{"Your account hasn't been activated."}</p>{" "}
                <p>Contact your manager.</p>
              </>
            )}
          </div>
          <ButtonLarge
            onClick={() => setIsEditing(!isEditing)}
            className="bg-plum-400 text-white"
          >
            {isEditing ? "Cancel" : "Edit Login Info"}
          </ButtonLarge>
        </div>
      </div>

      <Modal isOpen={isEditing} setIsOpen={setIsEditing}>
        <ModalPanel setIsOpen={setIsEditing}>
          <ModalTitle>Edit Profile</ModalTitle>
          <form
            onSubmit={(e) => handleSubmit(e, form, setForm)}
            className="flex flex-col justify-between"
          >
            <PinkInput
              name="username"
              label="Username"
              value={form.username}
              type="text"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <PinkInput
              name="password"
              label="Password"
              value={form.password}
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="flex justify-end">
              <ModalButton type="submit">Update</ModalButton>
            </div>
          </form>
        </ModalPanel>
      </Modal>

      {/* {isEditing && (
        <form onSubmit={(e) => handleSubmit(e, form, setForm)}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Update</button>
        </form>
      )} */}
    </div>
  )
}
