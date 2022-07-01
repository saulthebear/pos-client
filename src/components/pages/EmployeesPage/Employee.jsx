import React, { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { Toggle } from "../../ui/Toggle"
import { getAuthOptions } from "../../../helpers/utils"

import UserIcon from "../../ui/UserIcon"
import VerifiedIcon from "./VerifiedIcon"
import {
  ButtonLarge,
  ButtonSmall,
  CancelButton,
  DoneButton,
  EditableDisplayButton,
} from "../../ui/Button"
import { Input } from "../../ui/Input"
import Modal, { ModalPanel, ModalTitle } from "../../ui/Modal"

export default function Employee({
  id,
  username,
  role,
  setHasUpdated,
  setError,
  gridStyles,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [nameValue, setNameValue] = useState(username)

  const preventTailwindPurge = (
    <span className="bg-slate-700 bg-red-700 bg-green-700"></span>
  )

  const handleAdminToggleChange = async (isOn) => {
    try {
      const body = { role: isOn ? "admin" : "cashier" }
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        body,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleVerifiedToggleChange = async (isOn) => {
    try {
      const body = { role: isOn ? "cashier" : "unverified" }
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        body,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        getAuthOptions()
      )
      setHasUpdated(true)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const handleUpdateName = async () => {
    try {
      const body = { username: nameValue }
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/users/${id}`,
        body,
        getAuthOptions()
      )
      setIsEditing(false)
    } catch (err) {
      console.warn(err)
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data.error)
        }
      }
    }
  }

  const nameButton = (
    // <button
    //   type="button"
    //   onClick={() => setIsEditing(!isEditing)}
    //   className="flex justify-center items-center"
    // >
    //   <span>{nameValue}</span>
    //   <span className="material-symbols-rounded ml-3">edit</span>
    // </button>
    <EditableDisplayButton
      type="button"
      onClick={() => setIsEditing(!isEditing)}
    >
      {nameValue}
    </EditableDisplayButton>
  )

  // TODO: submit on enter, too
  const nameInput = (
    <div className="flex">
      <Input value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
      <div className="ml-2 flex">
        <DoneButton onClick={handleUpdateName} />
        <CancelButton
          onClick={() => {
            setNameValue(username)
            setIsEditing(false)
          }}
        />
      </div>
    </div>
  )

  const nameDisplay = isEditing ? nameInput : nameButton
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className={`${gridStyles}`}>
      {/* User icons and username */}
      <div className="flex justify-center items-center col-span-2">
        <div>
          <UserIcon isAdmin={role === "admin"} />
        </div>
        <div className="w-48">{nameDisplay}</div>
      </div>

      {/* Role (Admin?) */}
      <div className="flex justify-center items-center">
        <Toggle
          isOn={role === "admin"}
          label={"Enable Admin"}
          colorOn="red-700"
          colorOff="slate-700"
          isDisabled={role === "unverified"}
          onChange={handleAdminToggleChange}
        />
      </div>

      {/* Verified (Active?) */}
      <div className="flex justify-center items-center space-x-2">
        <Toggle
          isOn={role !== "unverified"}
          label={"Verify employee account"}
          colorOn="green-700"
          colorOff="slate-700"
          onChange={handleVerifiedToggleChange}
        />
        <VerifiedIcon isVerified={role !== "unverified"} />
      </div>
      <div className="flex justify-center items-center">
        <div className="p-5">
          <Modal isOpen={isDeleting} setIsOpen={setIsDeleting}>
            <ModalPanel>
              <ModalTitle>
                <span className="material-symbols-rounded">warning</span>Confirm
                <span className="material-symbols-rounded">warning</span>
              </ModalTitle>
              <div className="flex flex-col flex-1 justify-center items-center space-y-6 mb-5 space-evenly">
                <div className="flex flex-col items-center space-y-6 mb-5">
                  <span className="font-semibold text-xl mb-5">
                    Are you sure you want to delete...{username}?
                  </span>
                  <div className="flex justify-between space-x-6">
                    <ButtonLarge
                      className="bg-amber-600 text-white w-fit"
                      onClick={() => setIsDeleting(false)}
                    >
                      Cancel
                      {/* {isModalOpen ? "Cancel" : "New"} */}
                    </ButtonLarge>
                    <ButtonLarge
                      className="bg-red-700 text-white w-fit"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </ButtonLarge>
                  </div>
                </div>
              </div>
            </ModalPanel>
          </Modal>
          <ButtonSmall
            className="bg-red-700 text-white w-fit"
            onClick={() => setIsDeleting(true)}
          >
            Delete
            {/* {isModalOpen ? "Cancel" : "New"} */}
          </ButtonSmall>
        </div>
      </div>
      {/* <button
          className="bg-red-700 text-white py-1 px-3 rounded-md"
          onClick={() => handleDelete()}
        >
          Delete
        </button> */}
    </div>
  )
}

Employee.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setHasUpdated: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  gridStyles: PropTypes.string.isRequired,
}
