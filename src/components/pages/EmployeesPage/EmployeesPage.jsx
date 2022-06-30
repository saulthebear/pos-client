import React, { useState, useEffect, useId } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { getAuthOptions } from "../../../helpers/utils"
import { useAuth } from "../../../hooks/useAuth"
import { Navigate } from "react-router-dom"

import AuthService from "../../../helpers/authServices"
import Loading from "../../ui/Loading"
import Employee from "./Employee"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [hasUpdated, setHasUpdated] = useState(false)
  const [error, setError] = useState("")

  // const { user, isUserLoading } = useAuth()

  // if (isUserLoading) return <Loading />
  const user = AuthService.getCurrentUser()

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

  const gridStyles = "grid grid-cols-6 gap-4"

  const employeeList = employees.map((employee) => {
    return (
      <div key={`${id}-${employee._id}`} className="mb-2">
        <Employee
          {...employee}
          setHasUpdated={setHasUpdated}
          setError={setError}
          gridStyles={gridStyles}
        />
      </div>
    )
  })

  return (
    <div className="p-5">
      <div className="mx-auto max-w-fit">
        <h1 className="text-3xl font-semibold mb-5">Employees</h1>
        <p className="text-red-700">{error}</p>
        <div className={`text-2xl ${gridStyles} mb-3`}>
          <span className="col-span-2 ml-8">Username</span>
          <span className="text-center">Admin</span>
          <span className="text-center">Active</span>
        </div>
        {employeeList}
      </div>
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
