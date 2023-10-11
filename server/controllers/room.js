import mongoose from "mongoose";

import Room from "../models/room.js";
import { v2 as cloudinary } from "cloudinary";

const getAllRooms = async (req, res) => {
  try {
    const roomList = await Room.find({});

    if (roomList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rooms found!",
      });
    }

    res.status(200).json({
      error: false,
      rooms: roomList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const getRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) res.status(500).json({ error: true, message: "Room not found" });
  res.status(200).json({ error: false, room });
};

const addRoom = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No image in the request",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const room = new Room({
      name: req.body.name,
      pricePerNight: req.body.pricePerNight,
    });

    const newRoom = await room.save();

    if (!newRoom) {
      return res.status(500).json({
        error: true,
        message: "The room cannot be created",
      });
    }

    newRoom.image = result.secure_url;
    await newRoom.save();

    res.status(201).json({
      error: false,
      newRoom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: true,
        message: "Invalid Room Id",
      });
    }

    const { name, image, pricePerNight } = req.body;

    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({
        error: true,
        message: "Room not found!",
      });
    }

    let roomImage = room.image;
    const file = req.file;
    if (file) {
      const result = await cloudinary.uploader.upload(image.path);
      roomImage = result.secure_url;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        name,
        image: roomImage,
        pricePerNight: pricePerNight || 0,
      },
      { new: true }
    );

    res.status(200).json({
      error: false,
      room: updatedRoom,
      message: "Room updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const uploadRoomImages = async (req, res) => {
  try {
    const roomId = req.params.id;

    if (!mongoose.isValidObjectId(roomId)) {
      return res.status(400).send("Invalid Room Id");
    }

    const files = req.files;
    const promises = files.map((file) => cloudinary.uploader.upload(file.path));
    const results = await Promise.all(promises);
    const imagesPaths = results.map((result) => result.secure_url);

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { images: imagesPaths },
      { new: true }
    );

    if (!updatedRoom) {
      return res
        .status(500)
        .json({ error: true, message: "The room gallery cannot be updated!" });
    }

    res.status(201).json({ error: false, updatedRoom });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: "Server Error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (deletedRoom) {
      return res.status(204).json({ error: false, data: {} });
    } else {
      return res.status(404).json({
        error: true,
        message: "Room not found!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

export {
  getAllRooms,
  getRoom,
  addRoom,
  updateRoom,
  uploadRoomImages,
  deleteRoom,
};
