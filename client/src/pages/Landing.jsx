import React, { useEffect, useState } from "react";
import { Navbar, Footer, Header } from "../containers";
import { ButtonLink, ProductCard } from "../components";
import { useNavigate } from "react-router-dom";
import one from "../assets/header--img.jpeg";
import three from "../assets/three.jpeg";
import two from "../assets/two.jpeg";
import axios from "../../api/axios";

const Landing = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/rooms");
        setRooms(response?.data?.rooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <section className="flex flex-col-reverse md:flex-row">
        <div className="basis-1/2 px-5 md:px-10 lg:px-14 xl:px-20">
          <div className="py-10 md:py-40">
            <h3 className="text-2xl md:text-3xl font-syne text-mainTextColor font-[500] mb-10">
              About Us
            </h3>
            <p className="text-sm leading-8 text-secondaryTextColor">
              Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit
              amet. Nulla mattis, urna et posuere ornare, neque leo dapibus
              ante, nec dignissim massa felis ad nulla donec porttitor nulla et
              tristique dignissim.
            </p>
            <div className="mt-8">
              <ButtonLink
                title="Contact Us"
                textColor="text-white group-hover:text-mainTextColor transition-all duration-300"
                width="w-fit"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${one})`,
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
          className="basis-1/2 py-32 md:py-0"
        >
          <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50"></div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row">
        <div
          style={{
            backgroundImage: `url(${three})`,
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
          className="basis-1/2 py-32 md:py-0"
        >
          <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="basis-1/2 px-5 md:px-10 lg:px-14 xl:px-20">
          <div className="py-10 md:py-40">
            <h3 className="text-2xl md:text-3xl font-syne text-mainTextColor font-[500] mb-10">
              Great Location
            </h3>
            <p className="text-sm leading-8 text-secondaryTextColor">
              Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit
              amet. Nulla mattis, urna et posuere ornare, neque leo dapibus
              ante, nec dignissim massa felis ad nulla donec porttitor nulla et
              tristique dignissim.
            </p>
            <div className="mt-8">
              <ButtonLink
                title="Learn More"
                textColor="text-white group-hover:text-mainTextColor transition-all duration-300"
                width="w-fit"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row">
        <div className="basis-1/2 px-5 md:px-10 lg:px-14 xl:px-20">
          <div className="py-10 md:py-40">
            <h3 className="text-2xl md:text-3xl font-syne text-mainTextColor font-[500] mb-10">
              Friendly Staff
            </h3>
            <p className="text-sm leading-8 text-secondaryTextColor">
              Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit
              amet. Nulla mattis, urna et posuere ornare, neque leo dapibus
              ante, nec dignissim massa felis ad nulla donec porttitor nulla et
              tristique dignissim.
            </p>
            <div className="mt-8">
              <ButtonLink
                title="Learn More"
                textColor="text-white group-hover:text-mainTextColor transition-all duration-300"
                width="w-fit"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${two})`,
            width: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
          className="basis-1/2 py-32 md:py-0"
        >
          <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50"></div>
        </div>
      </section>
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 py-20 bg-[#f2f2f3]">
        <h3 className="text-2xl md:text-3xl font-syne text-mainTextColor font-[500] text-center mb-10">
          Special Offers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {rooms.map((r, i) => (
            <ProductCard
              key={i}
              room={r}
              imgUrl={r.image}
              roomCategory="Rent"
              roomName={r.name}
              roomPrice={r.pricePerNight}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <div
            onClick={() => navigate("/rooms")}
            className="mt-8 uppercase py-2.5 px-10 font-syne text-xs md:text-sm font-semibold cursor-pointer text-white bg-secondaryBackground w-fit rounded"
          >
            View all
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Landing;
