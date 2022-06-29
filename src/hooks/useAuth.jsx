import { useState, useEffect, useContext, createContext } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { getAuthOptions } from "../helpers/utils"
import PropTypes from "prop-types"

const AuthContext = createContext()

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [isUserLoading, setIsUserLoading] = useState(true)

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        { username, password },
        getAuthOptions()
      )
      const { token } = response.data
      localStorage.setItem("jwt", token)
      const decoded = jwt_decode(token)
      setUser(decoded)
    } catch (err) {
      console.warn("Error logging in", err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const logout = async () => {
    localStorage.removeItem("jwt")
    setUser(null)
  }

  const register = async (username, password) => {
    try {
      // post form data to the backend
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
      setUser(decoded)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  useEffect(() => {
    setIsUserLoading(true)
    const token = localStorage.getItem("jwt")
    if (token) {
      const decoded = jwt_decode(token)
      setUser(decoded)
    }
    setIsUserLoading(false)
  }, [])

  return {
    user,
    login,
    logout,
    register,
    error,
    isUserLoading,
  }
}
