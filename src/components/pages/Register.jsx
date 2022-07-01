import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
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
  const [formError, setFormError] = useState("")

  const register = AuthService.register
  let navigate = useNavigate()

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
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
      <div className="bg-plum-500 mx-auto px-14 py-6 rounded-3xl shadow-md pt-12 max-w-lg">
        {/* <ModalTitle>Register for an Account</ModalTitle> */}
        <h1 className="text-3xl text-center font-bold font-red-hat-display mb-5 text-white">
          Register for an Account
        </h1>

        <p className="flex items-center justify-center text-plum-900 bg-plum-200 py-2 px-5 rounded-lg">
          <span className="material-symbols-rounded mr-3">info</span>
          <span>
            Your account will need to be approved by a manager, before you can
            handle transactions.
          </span>
        </p>

        <p className="text-red-700">{error}</p>
        <p className="text-red-700 pb-4">{formError}</p>

        <form onSubmit={handleSubmit} className="">
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
