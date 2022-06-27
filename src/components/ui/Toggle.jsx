import { useState } from "react"
import { Switch } from "@headlessui/react"
import PropTypes from "prop-types"

export function Toggle({
  isOn,
  isDisabled,
  colorOn,
  colorOff,
  label,
  onChange,
}) {
  isOn = isOn || false
  colorOn = colorOn || "gray-200"
  colorOff = colorOff || "blue-600"
  isDisabled = isDisabled === "undefined" ? false : isDisabled

  const [enabled, setEnabled] = useState(isOn)

  // Prevent tailwind from purging these styles
  const preventTailwindPurge = <span className="bg-gray-200 bg-blue-600"></span>

  const handleChange = () => {
    if (isDisabled) return

    onChange(!enabled)
    setEnabled(!enabled)
  }

  let bgColor

  if (isDisabled) {
    bgColor = "bg-slate-300"
  } else if (enabled) {
    bgColor = `bg-${colorOn}`
  } else {
    bgColor = `bg-${colorOff}`
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${bgColor} relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </Switch>
  )
}

Toggle.propTypes = {
  isOn: PropTypes.bool,
  colorOn: PropTypes.string,
  colorOff: PropTypes.string,
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}
