import React, { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import { ProvideAuth } from "./hooks/useAuth"

function App() {
  // the currently logged in user will be stored up here in state
  // const [currentUser, setCurrentUser] = useState(null)
  // const { logout, user } = useAuth()

  // useEffect -- if the user navigates away form the page, we will log them back in
  // useEffect(() => {
  //   // check to see if token is in storage
  //   const token = localStorage.getItem("jwt")
  //   if (token) {
  //     // if so, we will decode it and set the user in app state
  //     setCurrentUser(jwt_decode(token))
  //   } else {
  //     setCurrentUser(null)
  //   }
  // }, []) // happen only once

  // event handler to log the user out when needed
  // const handleLogout = () => {
  //   // // check to see if a token exists in local storage
  //   // if (localStorage.getItem("jwt")) {
  //   //   // if so, delete it
  //   //   localStorage.removeItem("jwt")
  //   //   // set the user in the App state to be null
  //   //   setCurrentUser(null)
  //   // }
  //   logout()
  // }

  return (
    <Router>
      <ProvideAuth>
        <div className="h-screen grid grid-rows-[auto_1fr]">
          <header className="bg-brand">
            <Navbar />
          </header>
          <main className="bg-slate">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="admin/employees" element={<EmployeesPage />} />
              <Route path="admin/products" element={<ProductsPage />} />
              <Route path="admin/transactions" element={<TransactionsPage />} />
              <Route path="admin/categories" element={<CategoriesPage />} />
            </Routes>
          </main>
        </div>
      </ProvideAuth>
    </Router>
  )
}

export default App
