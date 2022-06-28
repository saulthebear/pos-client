import React, { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"

export default function Register({ currentUser, setCurrentUser }) {
  // state for the controlled form
  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // post fortm data to the backend
      const reqBody = {
        username,

        password,
      }
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/register`,
        reqBody
      )

      // save the token in localstorage
      const { token } = response.data
      localStorage.setItem("jwt", token)

      // decode the token
      const decoded = jwt_decode(token)

      // set the user in App's state to be the decoded token
      setCurrentUser(decoded)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  // conditionally render a navigate component
  if (currentUser) {
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

Register.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
}
