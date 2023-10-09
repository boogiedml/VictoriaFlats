import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const register = async (req, res) => {
  try {
    const admin = new Admin({
      username: req.body.username,
      passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    });

    const newAdmin = await admin.save();

    res.status(201).json({
      error: false,
      user: {
        _id: newAdmin._id,
        username: newAdmin.username,
      },
      code: 201,
      message: "Account Created Successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: true,
        message: "Admin already exists. Please use a different email address.",
      });
    }
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin)
    return res.status(404).json({
      error: true,
      message: "Admin not found!",
    });

  if (admin && bcrypt.compareSync(req.body.password, admin.passwordHash)) {
    const token = jwt.sign(
      {
        adminId: admin.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      error: false,
      data: {
        username: admin.username,
        adminId: admin.id,
        token: token,
      },
      code: 200,
      message: "Admin Authenticated",
    });
  } else {
    res.status(400).json({
      error: true,
      message: "Password is invalid!",
    });
  }
};

export { register, login };
