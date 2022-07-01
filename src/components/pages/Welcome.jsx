import React from "react"
import { Link } from "react-router-dom"
import { ButtonLarge } from "../ui/Button"
// import { ButtonLarge, ButtonSmall, CancelButton, AddButton } from "../ui/Button"
// import { PinkInput, Input } from "../ui/Input"
// import Tooltip from "../ui/Tooltip"
export default function Welcome() {
  return (
    <div className="flex flex-col justify-between bg-gray-200 h-full text-center font-red-hat-display p-12 space-x-10">
      <div className="bg-plum-400 rounded-lg m-30 px-10 py-10">
        <div>
          <h2 className="text-center text-3xl text-plum-900 font-red-hat-display font-black tracking-widest mb-10">
            <span className="text-white text-4xl">dettiPOS</span> provides a
            complete Point of Sale system for your business.
          </h2>
        </div>

        <div className="mb-10 text-plum-900">
          <p className="text-center text-xl mb-2">
            dettiPos provides the most user-centric and customizable POS
            software, compatible with all hardware.
          </p>
          <div className="text-lg">
            <p className="text-center">
              Register as a business and start building your personalized
              system.
            </p>
            <p className="text-center">
              Or register as an employee and start handling transactions.
            </p>
          </div>
        </div>

        <Link
          to="/register"
          className=" bg-[#257bb0] text-white shadow-lg text-2xl px-7 py-3 rounded-lg font-black tracking-widest flex items-center mx-auto w-fit"
        >
          <span>Get Started Now</span>
          <span className="material-symbols-rounded font-bold ml-3">
            arrow_forward
          </span>
        </Link>
      </div>
      <footer className="flex flex-col items-center">
        <div className="flex gap-5 items-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{ fill: "#000000" }}
          >
            <path
              fill="#0288d1"
              d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
            ></path>
            <rect width="4" height="15" x="14" y="19" fill="#fff"></rect>
            <path
              fill="#fff"
              d="M16,17L16,17c-1.2,0-2-0.9-2-2c0-1.1,0.8-2,2-2c1.2,0,2,0.9,2,2C18,16.1,17.2,17,16,17z"
            ></path>
            <path
              fill="#fff"
              d="M35,24.5c0-3-2.5-5.5-5.5-5.5c-1.9,0-3.5,0.9-4.5,2.3V19h-4v15h4v-8c0-1.7,1.3-3,3-3s3,1.3,3,3v8h4	C35,34,35,24.9,35,24.5z"
            ></path>
          </svg>
          <a
            href="https://www.linkedin.com/in/stefan-vosloo/"
            className="hover:bg-slate-300 py-1 px-3 rounded-md"
          >
            Stefan
          </a>
          <p>|</p>
          <a
            href="https://www.linkedin.com/in/grace-narez-8b0498238/"
            className="hover:bg-slate-300 py-1 px-3 rounded-md"
          >
            Grace
          </a>
          <p>|</p>
          <a
            href="https://www.linkedin.com/in/huseyingumus/"
            className="hover:bg-slate-300  py-1 px-3 rounded-md"
          >
            Heg
          </a>
        </div>
        <p className="flex justify-center place-content-end">
          © 2022 dettiPOS Point of Sale
        </p>
      </footer>
    </div>
  )
}
