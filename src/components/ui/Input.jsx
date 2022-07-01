import PropTypes from "prop-types"
import { useId } from "react"

export function PinkSelect({ className, label, children, ...props }) {
  const id = useId()
  return (
    <div className="flex flex-col mb-3">
      <label className="text-white font-semibold text-xl" htmlFor={id}>
        {label}
      </label>

      <select
        className={`${className} bg-plum-100 text-plum-800 rounded-sm shadow-inner hover:bg-plum-200 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-plum-500 px-4 py-2 placeholder:text-plum-400`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

PinkSelect.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
}

export function PinkInput({ className, label, ...props }) {
  const id = useId()
  return (
    <>
      <div className="flex flex-col mb-3">
        <label className="text-white font-semibold text-xl" htmlFor={id}>
          {label}
        </label>
        <input
          className={`${className} max-w-md bg-plum-100 text-plum-800 rounded-sm shadow-inner hover:bg-plum-200 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-plum-500 px-4 py-2 placeholder:text-plum-400`}
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
      <input
        className={`${className} bg-slate-200 rounded-md px-2 py-1 w-full shadow-[inset_0_2px_4px_0_rgb(30_41_59/0.5)] text-slate-800 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-slate-700`}
        {...props}
      />
    </>
  )
}

Input.propTypes = {
  className: PropTypes.string,
}
