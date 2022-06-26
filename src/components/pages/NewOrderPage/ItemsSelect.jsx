import React, { useId } from "react"
import ItemButton from "./ItemButton"
import PropTypes from "prop-types"

export default function ItemsSelect({ items }) {
  const id = useId()
  const itemButtons = items.map((item) => {
    return <ItemButton key={`${id}-${item._id}`} {...item} />
  })

  return (
    <div className="bg-slate-200 rounded-lg grow flex gap-2 flex-wrap p-5 content-start">
      {itemButtons}
    </div>
  )
}

ItemsSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }),
    })
  ),
}
