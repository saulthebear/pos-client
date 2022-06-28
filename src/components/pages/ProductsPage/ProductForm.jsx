import React from "react"
import { useState } from "react"
import PropTypes from "prop-types"

export default function ProductForm({ submitHandler, initialProductForm }) {
  const [productForm, setProductForm] = useState(initialProductForm)
  return (
    <div>
      <h1>ProductForm</h1>
      <form onSubmit={(e) => submitHandler(e, productForm, setProductForm)}>
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          value={productForm.name}
          onChange={(e) =>
            setProductForm({ ...productForm, name: e.target.value })
          }
        />
        <label htmlFor="code">Product Code:</label>
        <input
          type="text"
          id="code"
          value={productForm.code}
          onChange={(e) =>
            setProductForm({ ...productForm, code: e.target.value })
          }
        />
        <label htmlFor="price">Product Price:</label>
        <input
          type="number"
          step="0.01"
          id="price"
          value={productForm.price}
          onChange={(e) =>
            setProductForm({
              ...productForm,
              price: parseFloat(e.target.value),
            })
          }
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

ProductForm.propTypes = {
  submitHandler: PropTypes.func,
  initialProductForm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
}
