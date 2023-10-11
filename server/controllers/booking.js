import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { sendBookingConfirmationMail } from "../helpers/email.js";
import { bookingPayment, verifyPaymentStatus } from "../helpers/payment.js";

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
  const { room, checkInDate, checkOutDate, guests, name, email, phone } =
    req.body;

  try {
    const selectedRoom = await Room.findById(room);
    const pricePerNight = selectedRoom.pricePerNight;
    const totalNights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = pricePerNight * totalNights;

    const booking = new Booking({
      name,
      email,
      phone,
      room,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: "Pending",
    });

    let newBooking = await booking.save();

    if (!newBooking) {
      return res.status(404).json({
        error: true,
        message: "The booking couldn't be created",
      });
    }

    const payStackPayment = await bookingPayment({
      email: req.body.email,
      name: req.body.name,
      amount: totalPrice,
      bookingId: newBooking._id,
    });
    console.log(payStackPayment);
    newBooking.trnRef = payStackPayment?.data.reference;
    newBooking = await newBooking.save();

    if (!payStackPayment) {
      return res.status(500).json({
        error: true,
        message: "PayStack payment request failed",
      });
    }

    res.status(201).json({
      success: true,
      booking: newBooking,
      authUrl: payStackPayment?.data.authorization_url,
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
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(500).json({
        success: false,
        message: "The booking with the given ID was not found",
      });
    }

    const paymentDetails = await verifyPaymentStatus(booking.trnRef);

    if (paymentDetails?.data?.status === "success") {
      booking.status = "Approved";
      await booking.save();

      // const customerName = order.name;
      // const customerEmail = order.email;
      // const customerPrice = order.totalPrice;
      // const customerLocation = order.locationOfDelivery;

      // await sendBookingConfirmationMail(
      //   customerName,
      //   customerEmail,
      //   customerPrice,
      //   customerLocation
      // );

      return res.status(200).json({
        success: true,
        booking,
        message: "Booking Updated",
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
