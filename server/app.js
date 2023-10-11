import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/connect.js";
import verifyJwt from "./helpers/jwt.js";
import roomsRouter from "./routes/room.js";
import adminRouter from "./routes/admin.js";
import bookingRouter from "./routes/booking.js";

dotenv.config();
const app = express();
const apiRoute = "/api/v1";
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// app.use(verifyJwt);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: {
      message: "Welcome to Victoria Flats API",
      status_code: 200,
    },
  });
});
app.use(`${apiRoute}/rooms`, roomsRouter);
app.use(`${apiRoute}/admin`, adminRouter);
app.use(`${apiRoute}/bookings`, bookingRouter);

connectDB(process.env.CONNECTION_STRING);

app.listen(port, () => {
  console.log("Connection Started");
});
