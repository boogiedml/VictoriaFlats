import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonLink = ({ title, onClick, textColor, width }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`button__link group relative bg-transparent ${
        width ? width : "w-full"
      } hover:after:bg-opacity-50 py-1.5 md:py-2.5 px-6 md:px-10 font-syne uppercase font-semibold cursor-pointer`}
      onClick={onClick}
    >
      <span
        className={`${
          textColor ? textColor : "text-white"
        } text-[13px] md:text-sm relative z-10`}
      >
        {title}
      </span>
    </div>
  );
};

export default ButtonLink;
