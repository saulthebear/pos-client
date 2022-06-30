import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { PinkInput } from "../ui/Input"
import { ModalButton } from "../ui/Button"
import PropTypes from "prop-types"
import AuthService from "../../helpers/authServices"
import { userShape } from "../../helpers/propTypes"

export default function Register({ currentUser, setCurrentUser }) {
  // const { register, user, error } = useAuth()
  // state for the controlled form
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const register = AuthService.register
  let navigate = useNavigate()

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await register(username, password)
    if (response.user) {
      setCurrentUser(response.user)
      navigate("/profile", { replace: true })
    }
    if (response.error) setError(response.error)
  }

  // conditionally render a navigate component
  if (currentUser) {
    console.log("currentUser", currentUser)
    return <Navigate to="/profile" />
  }

  return (
    <div className="bg-plum-50 flex justify-between items-center px-12 py-12 h-full">
      <div className="bg-plum-500 mx-auto px-14 py-6 rounded-3xl shadow-md pt-12">
        <h1 className="font-xl font-bold text-white px-16">
          Register for an account:
        </h1>

        <p className="text-red-700">{error}</p>

        <form onSubmit={handleSubmit}>
          <PinkInput
            label="Username:"
            type="text"
            id="username"
            placeholder="your username..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <PinkInput
            label="Password:"
            type="password"
            id="password"
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex justify-end">
            <ModalButton type="submit">Register</ModalButton>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  currentUser: userShape,
}
