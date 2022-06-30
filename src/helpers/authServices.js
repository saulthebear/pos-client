import jwt_decode from "jwt-decode"
import axios from "axios"

const login = async (username, password) => {
  console.log("login", username, password)
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/login`,
      { username, password }
    )
    const { token } = response.data
    localStorage.setItem("jwt", token)
    const decodedUser = jwt_decode(token)
    return { user: decodedUser }
  } catch (err) {
    console.warn("Error logging in", err)
    if (err.response) {
      if (err.response.status === 400) {
        return { error: "Invalid credentials" }
      }
    }
  }
}

const logout = () => {
  localStorage.removeItem("jwt")
}

const register = async (username, password) => {
  try {
    const body = { username, password }
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/register`,
      body
    )
    const { token } = response.data
    localStorage.setItem("jwt", token)
    const decodedUser = jwt_decode(token)
    return { user: decodedUser }
  } catch (err) {
    console.warn(err)
    console.warn("Error registering", err.response)
    if (err.response) {
      if (err.response.status === 400) {
        return { error: err.response.data.error }
      }
    }
  }
}

const getCurrentUser = () => {
  const token = localStorage.getItem("jwt")
  if (token) {
    const decoded = jwt_decode(token)
    return decoded
  }
  return null
}

const AuthService = {
  getCurrentUser,
  login,
  logout,
  register,
}

export default AuthService
