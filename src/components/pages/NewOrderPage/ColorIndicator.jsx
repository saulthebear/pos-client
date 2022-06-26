import React from "react"
import PropTypes from "prop-types"
import colors from "../../../helpers/userColors"

export default function ColorIndicator({ color }) {
  return <div className={`w-4 h-4 rounded-full bg-${colors[color]}`}></div>
}

ColorIndicator.propTypes = {
  color: PropTypes.string.isRequired,
}
