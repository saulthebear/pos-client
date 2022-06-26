import React, { useState, useEffect, useId } from "react"
import axios from "axios"
import PropTypes from "prop-types"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        //get the token from local storage
        const token = localStorage.getItem("jwt")
        //make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users`,
          options
        )
        setEmployees(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEmployees()
  }, [])
  const id = useId()

  const employeeList = employees.map((employee) => {
    return <div key={`${id}-${employee._id}`}>{employee.username}</div>
  })

  return (
    <div>
      <h1>EmployeesPage</h1>
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
