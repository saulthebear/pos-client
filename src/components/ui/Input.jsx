import PropTypes from "prop-types"
import { useId } from "react"

export function PinkInput({ className, label, ...props }) {
  const id = useId()
  return (
    <>
      <div className="flex flex-col">
        <label className="text-white font-semibold" htmlFor={id}>
          {label}
        </label>
        <input
          className={`${className} max-w-md bg-plum-100 text-plum-800 rounded-sm shadow-inner hover:bg-plum-200 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-plum-500 px-4 py-2`}
          {...props}
        />
      </div>
    </>
  )
}

PinkInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
}

export function Input({ className, ...props }) {
  return (
    <>
      <div>
        <input
          className={`${className} max-w-md shadow-[inset_0_2px_4px_0_rgb(0_0_0/0.5)] bg-gray-100 text-gray-800 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-gray-700`}
          {...props}
        />
      </div>
    </>
  )
}

Input.propTypes = {
  className: PropTypes.string,
}
