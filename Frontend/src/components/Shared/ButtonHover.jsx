import React from "react"

function ButtonHover({text, active}) {
  return (
    <div className="flex justify-start items-center cursor-pointer">

      <div className={`${active ? "text-white" : "text-gray-500"} font-semibold hover:text-white text-lg`}>
        {text}
      </div>

    </div>
  )
}

export default ButtonHover