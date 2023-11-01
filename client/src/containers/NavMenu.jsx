import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonLink } from "../components";

const NavMenu = ({ menu }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed bg-white z-20 w-full h-full lg:hidden px-5 md:px-10 lg:px-14 xl:px-20 py-10 pt-28">
      <div className="flex justify-end">
        <ButtonLink title="Sign In" link="/signin" width="w-fit" />
      </div>
    </div>
  );
};

export default NavMenu;
