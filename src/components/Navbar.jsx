import React, { Link } from "react-router-dom"
import { Menu } from '@headlessui/react'
import PropTypes from "prop-types"

export default function Navbar({ currentUser, handleLogout }) {
  const loggedOut = (
    <>
      {/* if the user is not logged in... */}
      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>
    </>
  )
  const loggedIn = (
    <>
      {/* if the user is logged in... */}
      <Link to="/orders/new">New Order</Link>
      <Link to="/">
        <span onClick={handleLogout}>Logout</span>
      </Link>

      <Link to="/profile">profile icon</Link>
    </>
  )

  const admin = (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          <Link to="/admin/categories">Categories</Link>

        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )


  return (
    <nav>
      {/* user always sees this section */}
      <Link to="/">
        <p>DettiPos</p>
      </Link>

      {currentUser ? loggedIn : loggedOut}
    </nav>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,
}
