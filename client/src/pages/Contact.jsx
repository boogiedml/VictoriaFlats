import React from "react";
import { Footer, Navbar } from "../containers";
import { Input } from "../components";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-20">
        <h2 className="text-3xl lg:text-4xl font-playFair text-headerTextColor font-semibold">
          Contact
        </h2>
        <div className="mt-8 md:mt-14 flex flex-col gap-10 lg:gap-0 lg:flex-row">
          <div className="basis-1/3 xl:pr-8">
            <h3 className="text-2xl lg:text-3xl font-playFair text-headerTextColor font-semibold mb-5">
              Get in touch
            </h3>
            <p className="font-mavenPro text-[17px] leading-8 mb-10">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverable. Exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo no
            </p>
            <div className="mb-5">
              <h4 className="text-xl font-playFair text-headerTextColor font-semibold mb-2">
                Email Address
              </h4>
              <p className="leading-[2]">contact@example.com</p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair text-headerTextColor font-semibold mb-2">
                Phone Number
              </h4>
              <p className="leading-[2]">0541 669 333</p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair text-headerTextColor font-semibold mb-2">
                Our Address
              </h4>
              <p className="leading-[2]">52 Great Av, New York</p>
            </div>
          </div>
          <div className="basis-2/3 lg:pl-5">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="Your Name" placeholder="your name..." />
                <Input label="Your Phone" placeholder="Phone" />
                <Input
                  label="Your Email"
                  type="email"
                  placeholder="your e-mail..."
                />
                <Input label="Your Address" placeholder="Address" />
              </div>
              <div className="mt-8">
                <label className="block mb-2" htmlFor="">
                  Message
                </label>
                <textarea
                  className="w-full h-40 bg-[#fbf4ea] p-4 rounded-md outline-none text-sm placeholder:text-[#9d7b4d]"
                  placeholder="Your Message"
                  name=""
                  id=""
                ></textarea>
              </div>
              <button className="bg-[#d16d56] hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-10 rounded-md mt-5">get in touch</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
