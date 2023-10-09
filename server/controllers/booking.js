import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { sendBookingConfirmationMail } from "../helpers/email.js";

const getAllBookings = async (req, res) => {
  try {
    const bookingList = await Booking.find({})
      .populate("room")
      .sort({ dateBooked: -1 });

    if (!bookingList) {
      return res.status(500).json({
        success: false,
        message: "Cannot fetch booking list",
      });
    }

    if (bookingList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found!",
      });
    }

    res.status(200).json({
      error: false,
      bookings: bookingList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");

    if (!booking) {
      return res.status(500).json({
        success: false,
        message: "Cannot fetch booking",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createBooking = async (req, res) => {
  const { room, checkInDate, checkOutDate, guests } = req.body;

  try {
    // Calculate the total price based on room price and number of nights
    const selectedRoom = await Room.findById(room);
    const pricePerNight = selectedRoom.pricePerNight;
    const totalNights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = pricePerNight * totalNights;

    const booking = new Booking({
      room,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: "Pending",
    });

    const newBooking = await booking.save();

    // Send booking confirmation email
    // await sendBookingConfirmationMail(newBooking);

    res.status(201).json({
      success: true,
      newBooking,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!booking) {
      return res.status(500).json({
        success: false,
        message: "The booking with the given ID was not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
      message: "Booking Updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (booking) {
      return res.status(204).json({ error: false, data: {} });
    } else {
      return res.status(404).json({
        success: false,
        message: "Booking not found!",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
