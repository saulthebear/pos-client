import React from "react"
import PropTypes from "prop-types"

export default function Search({ className, ...props }) {
  return (
    <div className={`${className} flex relative`}>
      <span className="material-symbols-rounded text-plum-600 font-bold absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        search
      </span>
      <input
        {...props}
        className="bg-slate-300 placeholder:text-slate-500 rounded-md w-full px-4 py-1"
      />
    </div>
  )
}

Search.propTypes = {
  className: PropTypes.string,
}
