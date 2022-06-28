import React, {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useState, useEffect } from "react"
import NewOrderPage from "./components/pages/NewOrderPage/NewOrderPage"
import ProductsPage from "./components/pages/ProductsPage/ProductsPage"
import EmployeesPage from "./components/pages/EmployeesPage/EmployeesPage"
import CategoriesPage from "./components/pages/CategoriesPage/CategoriesPage"
import TransactionsPage from "./components/pages/TransactionsPage/TransactionsPage"
import Login from "./components/pages/Login"
import ProfilePage from "./components/pages/ProfilePage/ProfilePage"
import Register from "./components/pages/Register"
import Welcome from "./components/pages/Welcome"
import Navbar from "./components/Navbar"
import "./App.css"
import jwt_decode from "jwt-decode"

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem("jwt")
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem("jwt")) {
      // if so, delete it
      localStorage.removeItem("jwt")
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <div className="h-screen grid grid-rows-[3.5rem_1fr]">
        <header className="bg-brand">
          <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        </header>
        <main className="bg-slate">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/register"
              element={
                <Register
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            {/* conditionally render auth locked routes */}
            <Route
              path="/profile"
              element={
                currentUser ? (
                  <ProfilePage
                    handleLogout={handleLogout}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/orders/new" element={<NewOrderPage currentUser={currentUser} />} />
            <Route path="admin/employees" element={<EmployeesPage />} />
            <Route path="admin/products" element={<ProductsPage />} />
            <Route path="admin/transactions" element={<TransactionsPage />} />
            <Route path="admin/categories" element={<CategoriesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
