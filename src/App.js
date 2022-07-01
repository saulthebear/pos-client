import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import AuthService from "./helpers/authServices"

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())

  return (
    <Router>
      <div className="h-screen grid grid-rows-[auto_1fr]">
        <header className="bg-brand">
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </header>
        <main className="bg-slate">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/register"
              element={<Register setCurrentUser={setCurrentUser} />}
            />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
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
