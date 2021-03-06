import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import AuthService from "../../helpers/authServices"
import { PinkInput } from "../ui/Input"
import { ModalButton } from "../ui/Button"
import PropTypes from "prop-types"

export default function Login({ setCurrentUser }) {
  // state for the controlled form
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [formError, setFormError] = useState("")

  const user = AuthService.getCurrentUser()

  const login = AuthService.login

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    const response = await login(username, password)
    console.log("response", response)
    if (response.user) setCurrentUser(response.user)
    if (response.error) setError(response.error)
  }

  // conditionally render a navigate component
  if (user) {
    if (user.role === "cashier") return <Navigate to="/orders/new" />
    if (user.role === "admin") return <Navigate to="/admin/transactions" />
    return <Navigate to="/profile" />
  }

  const validateForm = () => {
    if (username == "") {
      setFormError("Name is required!")
      return false
    }
    if (password == "") {
      setFormError("Password is required!")
      return false
    }
    return true
  }

  return (
    <div className="bg-plum-50 flex justify-between items-center px-12 py-12 h-full">
      <div className="bg-plum-500 mx-auto px-14 py-6 rounded-3xl shadow-md pt-12 max-w-lg w-[500px]">
        <h1 className="text-3xl text-center font-bold font-red-hat-display mb-5 text-white">
          Login
        </h1>
        <p className="text-red-700 pb-4">{error}</p>
        <p className="text-red-700 pb-4">{formError}</p>
        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <PinkInput
              label="Username:"
              type="username"
              id="username"
              placeholder="your username..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <PinkInput
            label="Password:"
            type="password"
            id="password"
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex justify-end">
            <ModalButton type="submit">Login</ModalButton>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
}
