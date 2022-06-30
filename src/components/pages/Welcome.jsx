import React from "react"
import { ButtonLarge, ButtonSmall, CancelButton, AddButton } from "../ui/Button"
import { PinkInput, Input } from "../ui/Input"
import Tooltip from "../ui/Tooltip"
export default function Welcome() {
  return (
    <>
      <h1>DettiPOS is here to help with all our your business needs</h1>
      <h3>
        Register as a business and start building your personalized system
      </h3>
      <h3>Or register as an employee and start handling transactions</h3>
      <ButtonLarge className="bg-plum-400 text-white">Example</ButtonLarge>
      <ButtonLarge className="bg-emerald-600 text-white">Pay</ButtonLarge>
      <ButtonLarge className="bg-plum-400 text-white">Cancel</ButtonLarge>
      <ButtonSmall className="bg-plum-400 text-white">Hide</ButtonSmall>
      <ButtonSmall className="bg-amber-600 text-white">Edit</ButtonSmall>
      <ButtonSmall className="bg-red-700 text-white">Delete</ButtonSmall>
      <ButtonSmall className="bg-transparent border-2 border-plum-700 text-plum-700">
        Cancel
      </ButtonSmall>
      <CancelButton className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" />
      <AddButton className="material-symbols-outlined" />

      <Tooltip.Container>
        <Tooltip.Message>This is a tooltip</Tooltip.Message>
        Hover over me!
      </Tooltip.Container>

      <Tooltip.Container>
        <Tooltip.Message offset="bottom-5">This is a tooltip</Tooltip.Message>
        <ButtonLarge className="bg-pink-600 text-white">
          Tooltip button
        </ButtonLarge>
      </Tooltip.Container>

      {/* <div className="group relative">
        <Tooltip>This is a tooltip</Tooltip>
        Hover over me!
      </div> */}
      <div className="bg-plum-700 max-w-lg">
        <PinkInput
          label="input"
          className="p-2"
          type="text"
          placeholder="type here"
        />
      </div>
      <Input className="p-2" type="text" placeholder="type here" />
    </>
  )
}
