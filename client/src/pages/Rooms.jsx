import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../containers";
import { ProductCard } from "../components";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";

const Rooms = () => {
   const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoadingRooms(true);
        const response = await axios.get("/rooms");
        setRooms(response?.data?.rooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-3xl font-syne text-headerTextColor font-semibold">
            Rooms
          </h2>
        </div>
        {isLoadingRooms ? (
          <div className="w-full h-[500px] flex justify-center items-center">
            <ClipLoader size={40} color="#0C403A" />
          </div>
        ) : !rooms.length === 0 ? (
          <div className="w-full h-[500px] flex justify-center items-center text-center text-myBrown font-grotesk mt-4">
            No matching meal found.
          </div>
        ) : (
          <div className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Rooms;
