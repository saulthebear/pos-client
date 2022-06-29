import React from "react"
import PropTypes from "prop-types"

export function Container({ children }) {
  return <div className="group relative flex justify-center">{children}</div>
}

export function Message({ children, offset }) {
  return (
    <div
      className={`absolute flex-col items-center mb-6 hidden group-hover:flex ${
        offset ? offset : "bottom-0"
      }`}
    >
      <span className="relative z-10 py-2 px-3 leading-none text-white whitespace-nowrap bg-plum-900 shadow-lg rounded-md tracking-wide font-red-hat-display">
        {children}
      </span>
      {/* Tooltip arrow */}
      <div className="w-3 h-3 -mt-2 rotate-45 bg-plum-900 rounded-sm"></div>
    </div>
  )
}

export default {
  Container,
  Message,
}

Container.propTypes = {
  children: PropTypes.node,
}

Message.propTypes = {
  children: PropTypes.node,
  offset: PropTypes.string,
}
