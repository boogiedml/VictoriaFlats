import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { MdBedroomParent, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RoomBookingDetails = ({ room, closeDetails }) => {
  console.log(room);
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBooking = () => {
    const previousBooking = JSON.parse(localStorage.getItem("booking"));

    if (previousBooking) {
      localStorage.removeItem("booking");
    }

    const booking = { 
      roomId: room.id,
      roomName: room.name,
      roomType: "Rent",
      roomPrice: room.pricePerNight,
    };

    localStorage.setItem("booking", JSON.stringify(booking));
    setBookingDetails(booking);
    navigate("/checkout");
  };

  return (
    <div className="relative bg-white p-2 lg:rounded-lg overflow-y-scroll w-full h-full lg:h-auto lg:w-[90%] xl:w-[80%] text-start align-middle transition-all transform shadow-xl">
      <div className="w-fit sticky lg:absolute bg-secondaryBackground lg:bg-transparent p-2 rounded-full text-white lg:text-gray-500 top-4 lg:right-5 cursor-pointer lg:hover:text-black">
        <MdClose onClick={() => closeDetails()} size={25} />
      </div>
      <div className="overflow-scroll flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:w-1/2 p-2 xl:p-8 flex items-stretch">
          <div className="w-full h-[300px] lg:h-auto">
            <img
              className="w-full h-full max-h-[500px] object-cover rounded-lg"
              src={room.image}
              alt="roomImage"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-2 xl:p-8">
          <h3 className="text-xl lg:text-2xl text-gray-700 hover:text-amber-600 font-signika">
            {room.name}
          </h3>
          <p className="text-sm mt-2 font-semibold text-gray-400">Rent</p>
          <p className="font-semibold text-secondaryBackground text-3xl lg:text-4xl my-5">
            ₦{room.pricePerNight}
          </p>

          <p className="text-sm mt-2 font-semibold text-mainBackground">
            Available
          </p>

          <div className="w-full flex items-center justify-around bg-gray-200 my-4 p-1">
            <div className="px-3 py-1.5 text-gray-800 font-semibold text-base cursor-default">
              1
            </div>
          </div>
          <div>
            <button
              onClick={handleBooking}
              className="flex items-center justify-center gap-4 w-full bg-mainBackground text-white transition-all duration-500 font-semibold p-3 rounded-md"
            >
              <MdBedroomParent size={20} />
              Book Now
            </button>
          </div>
          <div className="flex w-full gap-4 my-4">
            <span className="basis-1/2 border-[1px] border-gray-300 rounded-md p-4 flex items-center gap-4 justify-center text-sm font-semibold text-gray-700 cursor-pointer hover:text-amber-600 transition-all duration-500">
              <AiOutlineHeart size={25} />
              Wishlist
            </span>
            <span className="basis-1/2 border-[1px] border-gray-300 rounded-md p-4 flex items-center gap-4 justify-center text-sm font-semibold text-gray-700 cursor-pointer hover:text-amber-600 transition-all duration-500">
              <TbShare3 size={25} />
              Share
            </span>
          </div>
          <div className="text-gray-700">
            <h4 className="text-md font-semibold mb-3">Room Details:</h4>
            <p className="text-sm leading-8">
              Welcome to our luxurious room, where comfort and convenience meet
              to create an unforgettable stay. This exquisite two-bedroom flat
              offers a haven of relaxation, featuring fully air-conditioned
              rooms with en-suite bathrooms and a separate visitors’ toilet.
              {/* <span className="text-amber-600 cursor-pointer">Read More</span> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

RoomBookingDetails.propTypes = {
  room: PropTypes.object,
  closeDetails: PropTypes.func,
};

export default RoomBookingDetails;
