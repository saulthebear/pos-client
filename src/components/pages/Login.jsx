import React, { useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

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
    <div>
      <h1>Login to Your Account:</h1>

      <p className="text-red-700">{error}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username:</label>
        <input
          type="username"
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

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
