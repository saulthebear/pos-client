import React from "react"
import { useState } from "react"
import PropTypes from 'prop-types'

export default function CategoryForm({ submitHandler, initialCatForm }) {
  const [catForm, setCatForm] = useState(initialCatForm)
  return (
    <div>
      <h1>CategoryForm</h1>
      <form onSubmit={e => submitHandler(e, catForm, setCatForm)}>
        <label htmlFor='name'>Category Name:</label>
        <input
          type="text"
          id="name"
          value={catForm.name}
          onChange={e => setCatForm({ ...catForm, name: e.target.value })}
        />
        <label htmlFor='color'>Category Color:</label>
        <input
          type="text"
          id="color"
          value={catForm.color}
          onChange={e => setCatForm({ ...catForm, color: e.target.value })}
        />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

CategoryForm.propTypes = {
  submitHandler: PropTypes.func,
  initialCatForm: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
}
