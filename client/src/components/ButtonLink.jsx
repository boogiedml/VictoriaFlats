import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonLink = ({ title, link, textColor, width }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`button__link group relative bg-transparent ${
        width ? width : "w-full"
      } hover:after:bg-opacity-50 py-2 m:py-2.5 px-8 md:px-10 font-syne uppercase font-semibold cursor-pointer`}
      onClick={() => navigate(`${link}`)}
    >
      <span
        className={`${
          textColor ? textColor : "text-white"
        } text-sm relative z-10`}
      >
        {title}
      </span>
    </div>
  );
};

export default ButtonLink;
