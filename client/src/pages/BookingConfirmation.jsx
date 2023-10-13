import React, { useEffect, useState } from "react";
import { BsFillPatchExclamationFill, BsPatchCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const updateOrder = async () => {
      setIsLoading(true);
      try {
        await axios.put(`/orders/${id}`);
        setIsSuccess(true);
        localStorage.clear();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    updateOrder();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav>
        <div className="text-white bg-secondaryBackground fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
          <div
            onClick={() => navigate("/admin")}
            className="logo text-base md:text-xl font-syne cursor-pointer lg:text-2xl font-semibold"
          >
            Victoria Flats
          </div>
        </div>
      </nav>
      <section className="flex-grow flex justify-center items-center">
        {isLoading ? (
          <ClipLoader size={40} color="#0C403A" />
        ) : (
          <div className="text-center">
            {isSuccess ? (
              <BsPatchCheckFill
                size={60}
                className="text-secondaryBackground mx-auto mb-8"
              />
            ) : (
              <BsFillPatchExclamationFill
                size={60}
                className="text-red-500 mx-auto mb-8"
              />
            )}
            <h2 className="text-xl lg:text-2xl font-syne text-headerTextColor font-semibold mb-8">
              {isSuccess ? "Payment Successful" : "Payment Unsuccessful"}
            </h2>
            <div
              onClick={() => navigate("/", { replace: true })}
              className="bg-mainBackground mx-auto cursor-pointer hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-10 rounded-md mt-5"
            >
              Go back to home
            </div>
          </div>
        )}
      </section>
      <footer className="bg-secondaryBackground">
        <div className="copyright py-5 text-center text-sm text-gray-300 font-mavenPro">
          Copyright © 2023 AnneLousia.com
        </div>
      </footer>
    </div>
  );
};

export default BookingConfirmation;
