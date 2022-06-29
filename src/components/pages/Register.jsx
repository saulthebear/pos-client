import React, { useState } from "react"
import { Navigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"

export default function Register() {
  const { register, user, error } = useAuth()
  // state for the controlled form
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    register(username, password)
  }

  // conditionally render a navigate component
  if (user) {
    return <Navigate to="/profile" />
  }

  return (
    <div>
      <h1>Register for an account:</h1>

      <p className="text-red-700">{error}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="your username..."
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
