import React from "react"

// Prevent tailwind from purging the colors from the userColors object
const colorComponents = [
  <div className="bg-red-300" key={1}></div>,
  <div className="bg-blue-300" key={1}></div>,
  <div className="bg-emerald-200" key={1}></div>,
  <div className="bg-purple-300" key={1}></div>,
  <div className="bg-yellow-200" key={1}></div>,
]
// Map strings to tailwind colors
const colors = {
  red: "red-300",
  blue: "blue-300",
  green: "emerald-200",
  purple: "purple-300",
  yellow: "yellow-200",
}

export default colors
