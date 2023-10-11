import React from "react";
import headerBg from "../assets/main.jpeg";
import { useNavigate } from "react-router-dom";
import { FaBinoculars } from "react-icons/fa6";
import { FaMapMarkedAlt, FaSwimmingPool } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const sideBgStyle = {
  backgroundImage: `url(${headerBg})`,
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div style={sideBgStyle} className="relative bg-mainBackground pt-[75px]">
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50"></div>
        <div className="px-5 md:px-10 lg:px-14 xl:px-20 py-44">
          <div className="md:max-w-lg xl:max-w-xl relative z-10">
            <h1 className="text-[2.7rem] lg:text-5xl xl:text-6xl leading-[1.2] text-white font-syne font-bold mb-5">
              Relax, We've Got Your Stay Covered
            </h1>
            <p className="font-mavenPro text-white text-[17px] leading-8">
              We have the best experts in room service to elevate your
              experience. Try us, and you'll feel the difference!
            </p>
            <div
              onClick={() => navigate("/rooms")}
              className="mt-8 uppercase py-2.5 px-10 font-syne text-sm md:text-base font-semibold cursor-pointer text-white bg-mainBackground bg-opacity-50 w-fit rounded"
            >
              View rooms
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f2f2f3] px-5 md:px-10 lg:px-14 xl:px-20 py-20">
        <div className="">
          <h3 className="text-2xl md:text-3xl font-syne text-mainTextColor font-[500] text-center mb-10">
            Flat's Facilities
          </h3>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-12">
            <div className="flex flex-row-reverse md:flex-row gap-6">
              <div className="text-3xl md:text-5xl text-mainBackground">
                <FaBinoculars />
              </div>
              <div className="sohohotel-text">
                <h4 className="text-lg md:text-xl font-syne text-mainTextColor font-[500] mb-3">
                  Great Views
                </h4>
                <p className="mb-8">
                  Proin felis mauris, fermentum non condimentum id, porttitor in
                  nisl curabitur euismod convallis.
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse md:flex-row gap-6">
              <div className="text-3xl md:text-5xl text-mainBackground">
                <FaSwimmingPool />
              </div>
              <div className="sohohotel-text">
                <h4 className="text-lg md:text-xl font-syne text-mainTextColor font-[500] mb-3">
                  Swimming Pool
                </h4>
                <p className="mb-8">
                  Proin felis mauris, fermentum non condimentum id, porttitor in
                  nisl curabitur euismod convallis.
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse md:flex-row gap-6">
              <div className="text-3xl md:text-5xl text-mainBackground">
                <MdSecurity />
              </div>
              <div className="sohohotel-text">
                <h4 className="text-lg md:text-xl font-syne text-mainTextColor font-[500] mb-3">
                  Security
                </h4>
                <p className="mb-8">
                  Proin felis mauris, fermentum non condimentum id, porttitor in
                  nisl curabitur euismod convallis.
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse md:flex-row gap-6">
              <div className="text-3xl md:text-5xl text-mainBackground">
                <FaMapMarkedAlt />
              </div>
              <div className="sohohotel-text">
                <h4 className="text-lg md:text-xl font-syne text-mainTextColor font-[500] mb-3">
                  Nice Location
                </h4>
                <p className="mb-8">
                  Proin felis mauris, fermentum non condimentum id, porttitor in
                  nisl curabitur euismod convallis.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Header;
