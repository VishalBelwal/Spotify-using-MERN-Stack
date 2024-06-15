import React from "react";

function PassInput({label, placeholder, value, setValue}) {
  return (
    <div className="passInput ">
      <label htmlFor="label" className="text-white flex flex-col p-2 font-semibold ">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="p-2 text-base border border-gray-500 border-solid rounded-lg placeholder-gray-500 bg-app-black input w-full"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      
    </div>
  );
}

export default PassInput;
