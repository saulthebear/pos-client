import PropTypes from "prop-types"

export const userShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
})

export const categoryShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
})

export const productShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: categoryShape,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
})

export const lineItemShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  product: productShape.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
})

export const transactionShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  lineItems: PropTypes.arrayOf(lineItemShape).isRequired,
  cashier: userShape,
  payment_method: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
})
