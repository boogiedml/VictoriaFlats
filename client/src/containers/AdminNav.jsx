import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLink } from "../components";
import Cookies from "js-cookie";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("in");
    Cookies.remove("__anne_____Lousia");
    Cookies.remove("__e-kom__dkmi");
    navigate("/");
  };

  return (
    <nav>
      <div className="text-white bg-secondaryBackground fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
        <div
          onClick={() => navigate("/admin")}
          className="logo text-base md:text-xl font-syne cursor-pointer lg:text-2xl font-semibold"
        >
          Victoria Flats
        </div>
        <ButtonLink
          onClick={handleLogout}
          title="Sign Out"
          width="w-fit"
        />
      </div>
    </nav>
  );
};

export default AdminNav;
