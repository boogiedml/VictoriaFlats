import React, { useState } from "react";
import { ButtonLink } from "../components";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const [isNavMenu, setIsNavMenu] = useState(false);
  const navigate = useNavigate();
  const menu = [
    { name: "Home", link: "/" },
    { name: "Rentals", link: "/rentals" },
    { name: "About", link: "/about" },
    { name: "Cart", link: "/cart" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <>
      <div className="text-white bg-secondaryBackground fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
        <div
          onClick={() => navigate("/")}
          className="logo text-base md:text-xl cursor-pointer font-syne lg:text-2xl font-semibold"
        >
          Victoria Flats
        </div>
        <div className="hidden lg:block">
          <ButtonLink title="Sign In" onClick={() => navigate("/signin")} />
        </div>
        <div
          onClick={() => setIsNavMenu(!isNavMenu)}
          className="bg-[#c28562] bg-opacity-20 p-3 rounded-lg lg:hidden border-[1px] border-secondaryBackground cursor-pointer"
        >
          <HiMenu size={20} />
        </div>
      </div>
      {isNavMenu && <NavMenu menu={menu} />}
    </>
  );
};

export default Navbar;
