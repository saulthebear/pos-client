import React, { Link } from "react-router-dom"
import { Menu, Transition } from "@headlessui/react"
import PropTypes from "prop-types"

export default function Navbar({ currentUser, handleLogout }) {
  const adminDropdown = (
    <Menu as="span" className="relative">
      <Menu.Button className="flex items-center hover:border-b-2 border-white">
        More <span className="material-symbols-rounded">arrow_drop_down</span>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="z-10 absolute"
      >
        <Menu.Items className="bg-brand shadow-md flex flex-col p-2 rounded">
          <Menu.Item>
            <Link
              to="/admin/transactions"
              className="hover:border-b-2 border-white"
            >
              Transactions
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/admin/products"
              className="hover:border-b-2 border-white"
            >
              Products
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/admin/categories"
              className="hover:border-b-2 border-white"
            >
              Categories
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link
              to="/admin/employees"
              className="hover:border-b-2 border-white"
            >
              Employees
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  return (
    <nav className="p-3 flex justify-between text-white text-lg items-center">
      {/* user always sees this section */}
      <Link to="/" className="hover:border-b-2 border-white">
        <p className="font-comfortaa font-bold text-2xl text-white">dettiPOS</p>
      </Link>
      <div className="flex gap-5 items-center">
        {/* For logged in users: New Order */}
        {currentUser && (
          <Link to="/orders/new" className="hover:border-b-2 border-white">
            New Order
          </Link>
        )}

        {/* For admins: dropdown */}
        {currentUser && currentUser.role === "admin" && adminDropdown}

        {/* For logged in users: Logout & profile */}
        {currentUser && (
          <>
            <Link to="/" className="hover:border-b-2 border-white">
              <span onClick={handleLogout}>Logout</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center bg-plum-300 p-1 rounded-full text-plum-900 border-[3px] border-plum-900 hover:bg-plum-500"
            >
              {currentUser.role !== "admin" && (
                <span className="material-symbols-rounded font-bold">face</span>
              )}
              {currentUser.role === "admin" && (
                <span className="material-symbols-rounded font-bold">
                  admin_panel_settings
                </span>
              )}
            </Link>
          </>
        )}

        {/*For non-logged in users: register & login */}
        {!currentUser && (
          <>
            <Link to="/register" className="hover:border-b-2 border-white">
              Register
            </Link>

            <Link to="/login" className="hover:border-b-2 border-white">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,
}
