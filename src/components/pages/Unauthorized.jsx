import React from "react"

export default function Unauthorized() {
  return (
    <div className="h-2/3 flex flex-col justify-center">
      <div className="bg-plum-100 max-w-lg mx-auto text-center py-20 px-10 rounded-2xl text-plum-900 flex flex-col">
        <span className="material-symbols-rounded text-5xl mb-10">report</span>
        <span className="text-2xl">
          You are not authorized to view this page.
        </span>
      </div>
    </div>
  )
}
