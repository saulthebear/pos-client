import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { PinkInput } from "../ui/Input"
import { ModalButton } from "../ui/Button"

export default function Login() {
  // state for the controlled form
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { user, login, error } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  // conditionally render a navigate component
  if (user) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="bg-plum-50 flex justify-between items-center px-12 py-12 h-full">
      <div className="bg-plum-500 mx-auto px-14 py-6 rounded-3xl shadow-md pt-12 sm:w-96">
        <h1 className="font-xl font-bold text-white px-16">Login</h1>
        <p className="text-red-700 pb-4">{error}</p>
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
