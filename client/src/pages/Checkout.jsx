import React, { useEffect, useRef, useState } from "react";
import { Footer, Navbar } from "../containers";
import { Input } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { Toast } from "primereact/toast";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const toast = useRef(null);
  const token = Cookies.get("__victoria_____Flats");
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  useEffect(() => {
    const storedBooking = JSON.parse(localStorage.getItem("booking"));

    if (storedBooking) {
      setBookingDetails([storedBooking]);
    }
    checkoutFormik.setFieldValue("room", storedBooking.roomId);
  }, []);

  const calculateHourDifference = () => {
    if (fromDateTime && toDateTime) {
      const fromDate = new Date(fromDateTime);
      const toDate = new Date(toDateTime);
      const timeDifferenceInMilliseconds = toDate - fromDate;
      const timeDifferenceInHours =
        timeDifferenceInMilliseconds / (1000 * 60 * 60);
      return timeDifferenceInHours;
    }
    return 0;
  };

  const convertToDays = (hourDifference) => {
    if (hourDifference < 24) {
      return 1;
    } else {
      const days = Math.ceil(hourDifference / 24);
      return days;
    }
  };

  const hourDifference = calculateHourDifference();
  const daysString = convertToDays(hourDifference);

  const totalBookingPrice =
    bookingDetails.length > 0 ? bookingDetails[0].roomPrice * daysString : 0;

  const checkoutFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      room: "",
      guests: "",
      checkInDate: "",
      checkOutDate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required").email("Invalid email"),
      phone: Yup.string().required("Phone is required"),
      room: Yup.string().required(),
      guests: Yup.string().required("Number of guests is required"),
      checkInDate: Yup.string().required("Check-in date is required"),
      checkOutDate: Yup.string().required("Check-out date is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      const url = "/bookings";
      const config = {
        headers: {
          token: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.post(url, values, config);
        console.log(data);
        if (!data.error) {
          // Redirect to the authUrl after a successful submission
          window.location.href = data.authUrl;
        }
      } catch (err) {
        console.log(err);
        const errorMessage =
          err.message === "Network Error"
            ? err.message
            : err?.response?.data?.message;
        showError({ msgContent: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    checkoutFormik.setFieldValue("checkInDate", fromDateTime);
    checkoutFormik.setFieldValue("checkOutDate", toDateTime);
  }, [toDateTime, fromDateTime]);

  return (
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-16">
        <form onSubmit={checkoutFormik.handleSubmit}>
          <h2 className="text-2xl lg:text-3xl font-syne text-headerTextColor font-semibold">
            Checkout
          </h2>
          <div className="mt-8 md:mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Your Name"
                placeholder="your name..."
                name="name"
                onChange={checkoutFormik.handleChange}
                defaultValue={checkoutFormik.values.name}
                onBlur={checkoutFormik.handleBlur}
              />
              <Input
                label="Your Email"
                placeholder="your email..."
                name="email"
                onChange={checkoutFormik.handleChange}
                defaultValue={checkoutFormik.values.email}
                onBlur={checkoutFormik.handleBlur}
              />
              <Input
                label="Your Phone"
                placeholder="Phone"
                name="phone"
                onChange={checkoutFormik.handleChange}
                defaultValue={checkoutFormik.values.phone}
                onBlur={checkoutFormik.handleBlur}
              />
              <Input
                label="No of guests"
                placeholder="No of guests"
                name="guests"
                onChange={checkoutFormik.handleChange}
                defaultValue={checkoutFormik.values.guests}
                onBlur={checkoutFormik.handleBlur}
              />
              <Input
                label="Check In"
                type="datetime-local"
                value={fromDateTime}
                onChange={(e) => setFromDateTime(e.target.value)}
              />
              <Input
                label="Check Out"
                type="datetime-local"
                value={toDateTime}
                onChange={(e) => setToDateTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            <h4 className="mb-4 text-lg font-playFair text-headerTextColor font-[500]">
              Your Bookings
            </h4>
            <div className="border-t-[1px] border-gray-300">
              <div className="flex border-b-[1px] border-gray-300">
                <p className="basis-2/3 p-4 font-semibold">Room</p>
                <p className="basis-1/3 p-4 font-semibold">Price per night</p>
              </div>
              <>
                {bookingDetails.map((booking, index) => (
                  <div key={index} className="flex">
                    <p className="basis-2/3 p-4 overflow-hidden whitespace-nowrap text-ellipsis">
                      {booking.roomName}
                    </p>
                    <p className="basis-1/3 p-4 text-lg">
                      ₦{booking.roomPrice}
                    </p>
                  </div>
                ))}
              </>
              <div className="flex border-b-[1px] border-gray-300">
                <p className="basis-2/3 p-4 font-semibold">Total</p>
                <p className="basis-1/3 p-4 font-semibold text-lg">
                  ₦{totalBookingPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-8 uppercase py-2.5 px-10 font-mavenPro font-semibold cursor-pointer text-white bg-secondaryBackground w-full md:w-fit text-center rounded"
              >
                {isLoading ? "Please wait..." : "Place Booking"}
              </button>
            </div>
          </div>
        </form>
      </section>
      <Footer />
      <Toast ref={toast} />
    </>
  );
};

export default Checkout;
