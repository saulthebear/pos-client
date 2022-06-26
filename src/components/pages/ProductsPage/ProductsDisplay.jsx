import React, { useId } from "react"
import PropTypes from "prop-types"

export default function ProductsDisplay({ products }) {
  const id = useId()

  const productList = products.map((product) => {
    return <div key={`${id}-${product._id}`}>{product.name}</div>
  })
  return (
    <div>
      <h1>ProductsDisplay</h1>
      {productList}
    </div>
  )
}

ProductsDisplay.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
}
