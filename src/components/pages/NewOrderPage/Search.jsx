import React from "react"

export default function Search() {
  return (
    <div className=" relative">
      <span className="material-symbols-rounded text-plum-600 font-bold absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        search
      </span>
      <input
        type="text"
        placeholder="filter items..."
        className="bg-slate-300 placeholder:text-slate-500 rounded-md w-full px-4 py-1"
      />
    </div>
  )
}
