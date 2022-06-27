import React, { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import CashierTransactions from "./CashierTransactions"
import { getAuthOptions } from "../../../helpers/utils"

export default function Profile({ currentUser, handleLogout }) {
  const [form, setForm] = useState({ username: currentUser.username, password: "" })
  const [isEditing, setIsEditing] = useState(false)
  // useEffect for getting the user data and checking auth

  const handleSubmit = async (e, form) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${currentUser.id}`, form, getAuthOptions())
      setForm(response.data)
      setIsEditing(false)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <p>{currentUser.username}</p>
      <p>{currentUser.role}</p>
      {isEditing && (

        <form onSubmit={e => handleSubmit(e, form, setForm)}>

          <label htmlFor="username">Username:</label>
          <input
            type='text'
            id='username'
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input
            type='text'
            id='password'
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Update</button>
        </form>
      )}
      <button
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel" : "Edit"}

      </button>

      <CashierTransactions />
    </div>
  )
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,

}
