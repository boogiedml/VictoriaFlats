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
      <ul className="flex flex-col gap-5">
        {menu.map((m, i) => (
          <li
            key={m.name + i}
            onClick={() => navigate(m.link)}
            className={`menu__nav__link uppercase text-base relative cursor-pointer py-2.5 text-headerTextColor p-3 rounded-lg  font-mavenPro font-[500] ${
              m.link === location.pathname
                ? "active bg-secondaryBackground scale-105 text-white"
                : ""
            }`}
          >
            {m.name}
          </li>
        ))}
      </ul>
      <div className="mt-14 flex justify-end">
        <ButtonLink title="Sign In" link="/signin" />
      </div>
    </div>
  );
};

export default NavMenu;
