import React from "react"
import PropTypes from "prop-types"
import ColorIndicator from "../../ui/ColorIndicator"

export default function CategoryButton({
  _id,
  name,
  color,
  setSelectedCategory,
  selectedCategory,
}) {
  const isSelected = _id === selectedCategory

  return (
    <button
      type="button"
      className={`${
        isSelected ? "bg-plum-800" : "bg-plum-600"
      } w-32 rounded-lg text-white font-semibold px-5 py-3 flex items-center shadow-md`}
      onClick={() => {
        console.log("setting selected category to", name, _id)
        setSelectedCategory(_id)
      }}
    >
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* <div className={`w-4 h-4 rounded-full bg-${colors[color]}`}></div> */}
        <ColorIndicator color={color} />
        <p>{name}</p>
      </div>
    </button>
  )
}

CategoryButton.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
}
