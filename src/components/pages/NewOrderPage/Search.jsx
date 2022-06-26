import React from "react"

export default function Search() {
  return (
    <div>
      <h3>Search Bar</h3>
      <input
        type="text"
        placeholder="filter items..."
        className="bg-slate-300 placeholder:text-slate-500"
      />
    </div>
  )
}
