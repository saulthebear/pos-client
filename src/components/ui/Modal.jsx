import React from "react"
import PropTypes from "prop-types"
import { Dialog } from "@headlessui/react"

export function ModalTitle({ children }) {
  return (
    <Dialog.Title className="text-3xl text-center font-bold font-red-hat-display mb-5">
      {children}
    </Dialog.Title>
  )
}

ModalTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

export function ModalPanel({ setIsOpen, children }) {
  return (
    <>
      <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-plum-500 text-white min-w-[30rem] min-h-[20rem] p-5 flex relative">
        <button onClick={() => setIsOpen(false)}>
          <span className="material-symbols-rounded absolute top-5 right-5 font-bold">
            close
          </span>
        </button>
        <div className="flex-1 flex flex-col">{children}</div>
      </Dialog.Panel>
    </>
  )
}

ModalPanel.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div
        className="fixed inset-0 bg-plum-100/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </Dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
