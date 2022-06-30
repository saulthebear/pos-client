import React, { useState, useEffect, useId } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { getAuthOptions } from "../../../helpers/utils"
import { Navigate } from "react-router-dom"

import AuthService from "../../../helpers/authServices"
import Employee from "./Employee"
import UserIcon from "../../ui/UserIcon"

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

  // sort employees & don't show current user
  useEffect(() => {
    // Make a copy so that we don't edit state directly
    const employeesCopy = [...employees].filter(
      (employee) => employee.id !== user.id
    )

    const roleRanking = {
      admin: 0,
      cashier: 1,
      unverified: 2,
    }

    // check if already sorted
    const isSorted = employeesCopy.every((employee, index) => {
      if (index === 0) return true
      return (
        roleRanking[employee.role] >= roleRanking[employees[index - 1].role]
      )
    })

    // To prevent infinite loop, only sort if not sorted
    if (isSorted) return

    // Sort the copied employees by role
    const sortedEmployees = employeesCopy.sort((a, b) => {
      if (roleRanking[a.role] < roleRanking[b.role]) {
        return -1
      }
      if (roleRanking[a.role] > roleRanking[b.role]) {
        return 1
      }
      return 0
    })
    setEmployees(sortedEmployees)
  }, [employees])

  const id = useId()

  const gridStyles = "grid grid-cols-6 gap-4"

  const employeeList = employees.map((employee) => {
    return (
      <div key={`${id}-${employee.id}`} className="mb-2">
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
          <span className="flex justify-center items-center">
            <UserIcon isAdmin={true} />
            Admin
          </span>
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
