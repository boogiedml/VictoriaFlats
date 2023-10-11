import React, { useEffect, useState } from "react";
import { AdminNav } from "../containers";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import RoomCard from "../components/RoomCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [rooms, setRooms] = useState([]);
  const token = Cookies.get("__victoria_____Flats");

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

  const deleteRoom = async (roomId) => {
    const config = {
      headers: {
        token: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(`/rooms/${roomId}`, config);
      if (response?.status === 204) {
        setRooms((prevRooms) => prevRooms.filter((p) => p._id !== roomId));
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen">
      <AdminNav />
      <section className="flex-grow w-full px-5 md:px-10 lg:px-14 xl:px-20 pt-28">
        <div className="mt-4">
          <h2 className="text-2xl lg:text-3xl font-syne text-headerTextColor font-semibold">
            Dashboard
          </h2>
        </div>
        <div className="products_display my-10">
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base lg:text-lg font-playFair text-mainTextColor">
                Rooms
              </h3>
              <button
                type="button"
                onClick={() => navigate("/admin/add_room")}
                className="bg-mainBackground font-syne hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-xs md:text-sm py-1.5 md:py-2 px-2 md:px-6 rounded-md"
              >
                Add room
              </button>
            </div>
            <div>
              {isLoadingRooms ? (
                <div className="w-full min-h-[400px] md:min-h-[250px] flex justify-center items-center">
                  <ClipLoader size={30} color="#040D12" />
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-5">
                  {rooms.map((r, i) => (
                    <RoomCard
                      key={i}
                      room={r}
                      imgUrl={r.image}
                      roomCategory="Rent"
                      roomName={r.name}
                      roomPrice={r.pricePerNight}
                      admin={true}
                      onDelete={deleteRoom}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-secondaryBackground">
        <div className="copyright py-5 text-center text-sm text-[#D2D3D5]">
          Copyright © 2023 Victoria Flats
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
