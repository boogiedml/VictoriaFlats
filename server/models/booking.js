import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  trnRef: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  dateBooked: {
    type: Date,
    default: Date.now(),
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
