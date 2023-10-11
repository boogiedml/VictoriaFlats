import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  pricePerNight: {
    type: Number,
    default: 0,
  },
});

roomSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

roomSchema.set("toJSON", {
  virtuals: true,
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
