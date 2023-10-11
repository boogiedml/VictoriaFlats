import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineSearch } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RoomBookingDetails } from "../containers";
import Modal from "./Modal";

const RoomCard = ({
  room,
  imgUrl,
  roomCategory,
  roomName,
  roomPrice,
  admin,
  onDelete,
}) => {
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const openBookingDetails = () => {
    !admin && setIsBookingDetailsOpen(true);
  };

  // Admin
  const handleDelete = () => {
    onDelete(room._id);
  };

  const closeModal = () => {
    setIsBookingDetailsOpen(false);
    setModalImage("");
  };

  return (
    <>
      <main className="flex flex-col group overflow-hidden bg-white rounded-lg cursor-pointer">
        <div className="flex relative w-full">
          <div className="w-full h-[300px]">
            <img
              src={imgUrl}
              alt={roomName}
              className="object-cover w-full h-full rounded-lg lg:group-hover:blur-sm"
            />
          </div>

          {!admin && (
            <div className="w-full h-full absolute z-10 hidden lg:flex items-center justify-center">
              <button
                onClick={openBookingDetails}
                className="absolute p-4 bg-white rounded-full cursor-pointer hover:bg-secondaryBackground hover:text-white scale-0 group-hover:scale-100 transition duration-700"
              >
                <HiOutlineSearch size={18} />
              </button>
            </div>
          )}
          {admin && (
            <Link to={`/admin/edit_room/${room?.id}`}>
              <span className="absolute right-3 top-3 z-10 p-4 rounded-full cursor-pointer bg-secondaryBackground text-white text-base hover:translate-y-1 transition-all duration-300">
                <FiEdit2 />
              </span>
            </Link>
          )}
          {admin && (
            <span
              className="absolute right-3 bottom-3 z-10 p-4 rounded-full cursor-pointer bg-secondaryBackground text-white text-base hover:-translate-y-1 transition-all duration-300"
              onClick={handleDelete}
            >
              <AiOutlineDelete />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-2 h-full overflow-hidden p-4 relative z-10">
          <p className="text-sm mt-2 font-syne font-[500] text-secondaryTextColor">
            {roomCategory}
          </p>
          <p
            onClick={openBookingDetails}
            className="w-fit text-sm text-headerTextColor"
          >
            {roomName}
          </p>
          <p className="font-semibold text-base font-mavenPro text-mainTextColor">
            ₦{roomPrice} {!admin && <span>a Night</span>}
          </p>
          {!admin && (
            <div className="flex lg:hidden justify-end mt-2">
              <button
                onClick={openBookingDetails}
                className="uppercase py-2.5 px-10 font-syne text-xs font-semibold cursor-pointer text-white bg-secondaryBackground w-fit rounded"
              >
                View more
              </button>
            </div>
          )}
        </div>
      </main>
      <>
        {isBookingDetailsOpen && (
          <Modal close={closeModal}>
            <RoomBookingDetails room={room} closeDetails={closeModal} />
          </Modal>
        )}
      </>
    </>
  );
};

RoomCard.propTypes = {
  product: PropTypes.object,
  imgUrl: PropTypes.string,
  productCategory: PropTypes.string,
  productWay: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.string,
  style: PropTypes.string,
};

export default RoomCard;
