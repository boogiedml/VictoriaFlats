import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../components";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { AdminNav } from "../containers";

const AddRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

  const roomFormik = useFormik({
    initialValues: {
      name: "",
      pricePerNight: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Room title is required"),
      pricePerNight: Yup.string().required("Price is required"),
      image: Yup.string().required("Room image is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      const url = "/rooms";
      const config = {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.post(url, values, config);
        if (!data.error) {
          navigate("/admin");
        }
      } catch (err) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNav />
      <section className="flex-grow w-full px-5 md:px-10 lg:px-14 xl:px-20 mt-28 lg:mt-0 mb-8 flex items-center justify-center">
        <div className="w-full">
          <div>
            <h2 className="text-xl lg:text-2xl font-syne text-headerTextColor font-semibold mb-8">
              Add Room
            </h2>
            <form onSubmit={roomFormik.handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-9">
                <Input
                  label="Room Title"
                  placeholder="Ex. Room 1"
                  name="name"
                  onChange={roomFormik.handleChange}
                  defaultValue={roomFormik.values.name}
                  onBlur={roomFormik.handleBlur}
                />
                <Input
                  label="Price per night"
                  name="pricePerNight"
                  placeholder="Ex. 40000"
                  onChange={roomFormik.handleChange}
                  defaultValue={roomFormik.values.pricePerNight}
                  onBlur={roomFormik.handleBlur}
                />
                <Input
                  label="Room Image"
                  name="image"
                  type="file"
                  fileFormik={roomFormik}
                />
              </div>
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="bg-mainBackground font-syne hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-1.5 md:py-2 px-2 md:px-6 rounded-md"
                >
                  {isLoading ? "Please wait..." : "Create room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="bg-secondaryBackground">
        <div className="copyright py-5 text-center text-sm text-gray-300 font-mavenPro">
          Copyright © 2023 AnneLousia.com
        </div>
      </footer>
      <Toast ref={toast} />
    </div>
  );
};

export default AddRoom;
