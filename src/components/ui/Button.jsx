import React from "react"
import PropTypes from "prop-types"

export default function Button({ className, children, ...props }) {
  return (
    <button className={`${className} rounded-md`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLarge({ className, children, ...props }) {
  return (
    <Button
      className={`${className} py-2 px-4 uppercase font-semibold`}
      {...props}
    >
      {children}
    </Button>
  )
}

export function ButtonSmall({ className, children, ...props }) {
  return (
    <Button
      className={`${className} py-[2px] px-3 font-red-hat-display font-medium tracking-wide`}
      {...props}
    >
      {children}
    </Button>
  )
}
export function CancelButton({ className, ...props }) {
  return (
    <button className={`${className} flex items-center`} {...props}>
      <span className="material-symbols-rounded">close</span>
    </button>
  )
}
export function DoneButton({ className, ...props }) {
  return (
    <button className={`${className} flex items-center`} {...props}>
      <span className="material-symbols-rounded">done</span>
    </button>
  )
}
export function AddButton({ className, ...props }) {
  return (
    <div>
      <button
        className={`${className} bg-plum-400 text-white rounded-full flex items-center justify-center w-10 h-10`}
        {...props}
      >
        <span className="material-symbols-rounded font-bold">add</span>
      </button>
    </div>
  )
}

export function ModalButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="font-black tracking-wide font-red-hat-display flex items-center justify-center text-lg uppercase text-white"
    >
      {children}
      <span className="material-symbols-rounded font-medium text-3xl">
        navigate_next
      </span>
    </button>
  )
}

export function EditableDisplayButton({ children, ...props }) {
  return (
    <button {...props} className="text-lg">
      {children}
      <span className="material-symbols-rounded font-medium ml-3">edit</span>
    </button>
  )
}

EditableDisplayButton.propTypes = {
  children: PropTypes.node.isRequired,
}
DoneButton.propTypes = {
  className: PropTypes.string,
}

ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
}
CancelButton.propTypes = {
  className: PropTypes.string,
}
AddButton.propTypes = {
  className: PropTypes.string,
}
const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}

ButtonLarge.propTypes = propTypes
ButtonSmall.propTypes = propTypes
Button.propTypes = propTypes
