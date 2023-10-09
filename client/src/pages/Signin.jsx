import React, { useRef, useState } from "react";
import { Footer, Navbar } from "../containers";
import { Input } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const Signin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  const signinFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const url = "/admin/login";
      try {
        const { data } = await axios.post(url, values);
        if (!data.error) {
          const { token, adminId } = data.data;
          Cookies.set("__anne_____Lousia", token);
          Cookies.set("__e-kom__dkmi", adminId);
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
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-20">
        <h2 className="text-3xl lg:text-4xl font-playFair text-headerTextColor font-semibold">
          Admin Login
        </h2>
        <div className="mt-8 md:mt-14">
          <form
            onSubmit={signinFormik.handleSubmit}
            className="flex flex-col gap-8"
          >
            <Input
              label="Username"
              name="username"
              onChange={signinFormik.handleChange}
              defaultValue={signinFormik.values.username}
              onBlur={signinFormik.handleBlur}
              placeholder="username"
            />
            <Input
              label="Password"
              type="password"
              placeholder="*************"
              name="password"
              onChange={signinFormik.handleChange}
              defaultValue={signinFormik.values.password}
              onBlur={signinFormik.handleBlur}
            />
            <button
              type="submit"
              className="bg-secondaryBackground hover:bg-black transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-16 rounded-md w-full md:w-fit"
            >
              {isLoading ? "Please wait..." : "Log in"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
      <Toast ref={toast} />
    </>
  );
};

export default Signin;
