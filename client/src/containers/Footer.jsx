import React from "react";

const Footer = () => {
  return (
    <div className="text-white bg-secondaryBackground px-5 md:px-10 lg:px-14 xl:px-20 pt-16 md:pt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-14">
        <div className="md:pr-4 mb-4 md:mb-0">
          <div className="logo relative text-xl md:text-2xl xl:text-3xl font-syne font-semibold mb-5 md:mb-8 after:w-[10%] md:after:h-[3px] after:bg-white after:absolute after:left-0 after:-bottom-3">
            Victoria Flats
          </div>
          <p className="text-gray-300 leading-8">
            Welcome to Victoria Flat Bnb Building, where modern comfort meets
            timeless elegance.
          </p>
        </div>
        <div className="mb-4 md:mb-0">
          <div className="logo relative text-xl md:text-2xl xl:text-3xl font-syne font-semibold mb-5 md:mb-8 after:w-[10%] md:after:h-[3px] after:bg-white after:absolute after:left-0 after:-bottom-3">
            Address
          </div>
          <ul className="text-gray-300 leading-8">
            <li>
              <span className="font-[600] tracking-wider">Address:</span> 8
              ILORI STREET IJEGUN LAGOS.
            </li>
            <li>
              <span className="font-[600] tracking-wider">Phone:</span> 0541 669
              333
            </li>
            <li>
              <span className="font-[600] tracking-wider">Email:</span>{" "}
              contact@example.com
            </li>
            <li>
              <span className="font-[600] tracking-wider">Social Media:</span>{" "}
              Facebook, Twitter
            </li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <div className="logo relative text-xl md:text-2xl xl:text-3xl font-syne font-semibold mb-5 md:mb-8 after:w-[10%] md:after:h-[3px] after:bg-white after:absolute after:left-0 after:-bottom-3">
            Links
          </div>
          <ul className="text-gray-300 leading-8 tracking-[1.3px]">
            <li>ROOMS</li>
            <li>ABOUT US</li>
            <li>RETURN POLICY</li>
            <li>CONTACT US</li>
          </ul>
        </div>
      </div>
      <hr className=" border-b-[1px] border-x-0 border-t-0 border-[#8686eb29]" />
      <div className="copyright py-5 text-center text-sm text-[#D2D3D5]">
        Copyright © 2023 Victoria Flats
      </div>
    </div>
  );
};

export default Footer;
