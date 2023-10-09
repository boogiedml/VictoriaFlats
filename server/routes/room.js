import express from "express";
import multer from "multer";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import {
  addRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  uploadRoomImages,
} from "../controllers/room.js";

const roomsRouter = express.Router();
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage and options
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadOptions = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Get All Rooms
roomsRouter.route("/").get(getAllRooms);

// Get One Room
roomsRouter.route("/:id").get(getRoom);

// Add New Room
roomsRouter.post("/", uploadOptions.single("image"), addRoom);

// Update Room
roomsRouter.put("/:id", uploadOptions.single("image"), updateRoom);

// Delete Room
roomsRouter.route("/:id").delete(deleteRoom);

// Room Images Upload
roomsRouter
  .route("/gallery-images/:id")
  .put(uploadOptions.array("images", 5), uploadRoomImages);

export default roomsRouter;
