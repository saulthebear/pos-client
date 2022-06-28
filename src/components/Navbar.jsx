import React, { Link } from "react-router-dom"
import { Menu, Transition } from '@headlessui/react'
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
    <Menu as="span" className="relative">
      <Menu.Button>More</Menu.Button>
      <Transition enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="z-10 absolute"
        >

      <Menu.Items className="bg-white flex flex-col p-2 rounded">
        <Menu.Item>
          <Link to="/admin/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/employees">Employees</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/admin/products">Products</Link>
        </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>
  )


  return (
    <nav>
      {/* user always sees this section */}
      <Link to="/">
        <p>DettiPos</p>
      </Link>
      {currentUser && currentUser.role === "admin" && admin}
      {currentUser && loggedIn}
      {!currentUser && loggedOut}

      {/* {currentUser ? loggedIn : loggedOut} */}
    </nav>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,
}