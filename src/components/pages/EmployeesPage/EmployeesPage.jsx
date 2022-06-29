import React, { useState, useEffect, useId } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { Toggle } from "../../ui/Toggle"
import { getAuthOptions } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import { Navigate } from "react-router-dom"
import Loading from "../../ui/Loading"

function UserIcon({ isAdmin }) {
  return (
    <div>
      {isAdmin ? (
        <span className="material-symbols-rounded text-red-700 font-bold">
          admin_panel_settings
        </span>
      ) : (
        <span className="material-symbols-rounded text-slate-900 font-bold">
          account_circle
        </span>
      )}
    </div>
  )
}

UserIcon.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
}

function VerifiedIcon({ isVerified }) {
  if (isVerified)
    return (
      <span className="material-symbols-rounded text-green-700 font-bold">
        verified
      </span>
    )

  return (
    <span className="material-symbols-rounded text-red-700 font-bold">
      dangerous
    </span>
  )
}

VerifiedIcon.propTypes = {
  isVerified: PropTypes.bool.isRequired,
}

function Employee({ _id, username, role, setHasUpdated, setError }) {
  const [isEditing, setIsEditing] = useState(false)
  const [nameValue, setNameValue] = useState(username)

  const preventTailwindPurge = (
    <span className="bg-slate-700 bg-red-700 bg-green-700"></span>
  )

  const handleAdminToggleChange = async (isOn) => {
    try {
      const body = { role: isOn ? "admin" : "cashier" }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${_id}`,
        body,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleVerifiedToggleChange = async (isOn) => {
    try {
      const body = { role: isOn ? "cashier" : "unverified" }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${_id}`,
        body,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/users/${_id}`,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleUpdateName = async () => {
    try {
      const body = { username: nameValue }
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${_id}`,
        body,
        getAuthOptions()
      )
      setIsEditing(false)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const nameButton = (
    <button type="button" onClick={() => setIsEditing(!isEditing)}>
      <span>{nameValue}</span>
      <span className="material-symbols-rounded">edit</span>
    </button>
  )

  // TODO: submit on enter, too
  const nameInput = (
    <>
      <input
        className="bg-slate-300 rounded-md px-2 py-1 shadow-inner"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
      />
      <button type="button" onClick={handleUpdateName}>
        <span className="material-symbols-rounded">done</span>
      </button>
    </>
  )

  const nameDisplay = isEditing ? nameInput : nameButton

  return (
    <div className="flex gap-2">
      <div>
        <UserIcon isAdmin={role === "admin"} />
      </div>
      <div className="w-48">{nameDisplay}</div>
      <div>
        <Toggle
          isOn={role === "admin"}
          label={"Enable Admin"}
          colorOn="red-700"
          colorOff="slate-700"
          isDisabled={role === "unverified"}
          onChange={handleAdminToggleChange}
        />
      </div>
      <div>
        <Toggle
          isOn={role !== "unverified"}
          label={"Verify employee account"}
          colorOn="green-700"
          colorOff="slate-700"
          onChange={handleVerifiedToggleChange}
        />
        <VerifiedIcon isVerified={role !== "unverified"} />
      </div>
      <button
        className="bg-red-700 text-white py-1 px-3 rounded-md"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  )
}

Employee.propTypes = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setHasUpdated: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [hasUpdated, setHasUpdated] = useState(false)
  const [error, setError] = useState("")

  const { user, isUserLoading } = useAuth()

  if (isUserLoading) return <Loading />

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== "admin") {
    return <div>You are not authorized to view this page.</div>
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (hasUpdated) setHasUpdated(false)
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users`,
          getAuthOptions()
        )
        setEmployees(response.data)
      } catch (err) {
        console.warn(err)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.error)
          }
        }
      }
    }
    fetchEmployees()
  }, [hasUpdated])
  const id = useId()

  const employeeList = employees.map((employee) => {
    return (
      <div key={`${id}-${employee._id}`} className="mb-2">
        <Employee
          {...employee}
          setHasUpdated={setHasUpdated}
          setError={setError}
        />
      </div>
    )
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold">Employees</h1>
      <p className="text-red-700">{error}</p>
      <div className="text-2xl">
        <span>Username</span>
        <span>Admin</span>
        <span>Active</span>
      </div>
      {employeeList}
    </div>
  )
}

EmployeesPage.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  ),
}
