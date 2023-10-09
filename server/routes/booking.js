import express from "express";
import {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.js";

const bookingRouter = express.Router();

// Get All Bookings
bookingRouter.route("/").get(getAllBookings);

// Get Booking by ID
bookingRouter.route("/:id").get(getBooking);

// Create New Booking
bookingRouter.route("/").post(createBooking);

// Update Booking
bookingRouter.route("/:id").put(updateBooking);

// Delete Booking
bookingRouter.route("/:id").delete(deleteBooking);

export default bookingRouter;
