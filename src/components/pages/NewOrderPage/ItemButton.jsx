import React from "react"
import PropTypes from "prop-types"
import ColorIndicator from "../../ui/ColorIndicator"
import { formatCurrency } from "../../../helpers/utils"

export default function ItemButton({ name, price, category, onClick }) {
  const formattedPrice = formatCurrency(price)
  const color = category ? category.color : null
  return (
    <button
      type="button"
      className="bg-slate-500 text-white font-semibold rounded-lg relative shadow-md p-3 w-32 h-32"
      onClick={onClick}
    >
      <span className="absolute top-2 left-2">
        {color && <ColorIndicator color={color} />}
      </span>
      <div className="mt-3">
        <p>{name}</p>
        <p>{formattedPrice}</p>
      </div>
    </button>
  )
}

ItemButton.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
}
