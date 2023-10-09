import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

AdminSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

AdminSchema.set("toJSON", {
  virtuals: true,
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
