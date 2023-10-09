import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Booking from "../models/booking.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendBookingConfirmationMail = async (bookingId) => {
  try {
    // Retrieve booking details from the database using the bookingId
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.error("Booking not found for confirmation email.");
      return;
    }

    const { name, email, totalPrice, locationOfDelivery } = booking;

    const currentModuleDirectory = path.dirname(
      new URL(import.meta.url).pathname
    );

    // Construct the template file path based on the current module directory
    const templatePath = path.join(
      currentModuleDirectory,
      "emailTemplates",
      "booking-confirmation-template.html"
    );

    // Read the email template file
    const emailTemplate = fs.readFileSync(templatePath, "utf8");

    const htmlContent = emailTemplate
      .replace("{name}", name)
      .replace("{totalPrice}", totalPrice)
      .replace("{locationOfDelivery}", locationOfDelivery);

    let info = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to: email,
      subject: "Booking Confirmation",
      html: htmlContent,
    });

    console.log("Booking Confirmation Email sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};

export { sendBookingConfirmationMail };
