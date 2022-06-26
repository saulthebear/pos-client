import React, { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import CashierTransactions from "./CashierTransactions"

export default function Profile({ currentUser, handleLogout }) {
  // useEffect for getting the user data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt")
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        // hit the auth locked endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        )
        // example POST with auth headers (options are always last argument)
        // await axios.post(url, requestBody (form data), options)
        // set the secret user message in state
      } catch (err) {
        // if the error is a 401 -- that means that auth failed
        console.warn(err)
        if (err.response) {
          if (err.response.status === 401) {
            // panic!
            handleLogout()
          }
        }
      }
    }
    fetchData()
  })
  return (
    <div>
      <h1>Hello, {currentUser.name}</h1>

      <p>your email is {currentUser.email}</p>

      <CashierTransactions />
    </div>
  )
}

Profile.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,
}
