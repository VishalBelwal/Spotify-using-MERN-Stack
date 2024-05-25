import React from "react";

function PassInput({label, placeholder, value, setValue}) {
  return (
    <div className="passInput ">
      <label htmlFor="124" className="text-black flex flex-col p-2 font-semibold ">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="p-2 border border-gray-500 border-solid rounded-md placeholder-gray-500 input w-full"
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
