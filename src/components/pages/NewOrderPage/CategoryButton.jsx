import React from "react"
import PropTypes from "prop-types"
import colors from "../../../helpers/userColors"

export default function CategoryButton({ id, name, color }) {
  return (
    <button
      type="button"
      className="bg-plum-600 w-32 rounded-lg text-white font-semibold px-5 py-3 flex items-center"
    >
      <div className="flex items-center gap-1 flex-wrap">
        <div className={`w-4 h-4 rounded-full bg-${colors[color]}`}></div>
        <p>{name}</p>
      </div>
    </button>
  )
}

CategoryButton.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}
