import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function IconText({ logo, iconName, active, targetLink, onClick}) {
  return (
    <Link to={targetLink}  >
      <div className="flex justify-start items-center cursor-pointer" onClick={onClick}>
        <div className="px-1 py-2 ">
          <Icon icon={logo} color={active ? "white" : "gray"} fontSize={25} />
        </div>

        <div
          className={`${
            active ? "text-white" : "text-gray-400"
          } text-sm font-bold hover:text-white`}
        >
          {iconName}
        </div>
      </div>
    </Link>
  );
}

export default IconText;
