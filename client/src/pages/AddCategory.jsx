import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLink, Input } from "../components";
import { BiCategoryAlt } from "react-icons/bi";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const token = Cookies.get("__v_i_va");
  const showError = ({ msgContent }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msgContent,
      life: 3000,
    });
  };

  const [selectedCategoryType, setSelectedCategoryType] = useState("");

  const categoryFormik = useFormik({
    initialValues: {
      name: "",
      categoryType: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category name is required"),
      categoryType: Yup.string().required("Category type is required"),
      image: Yup.string().required("Category image is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      values.categoryType = selectedCategoryType;
      const url = "/category";
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

  const handleCategoryTypeChange = (type) => {
    setSelectedCategoryType(type);
    categoryFormik.setFieldValue("categoryType", type); // Update the formik field value
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav>
        <div className="bg-white fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
          <div className="logo text-xl md:text-2xl lg:text-3xl font-playFair font-semibold">
            AnneLousia
          </div>
          <ButtonLink title="Sign Out" link="/signin" />
        </div>
      </nav>
      <section className="flex-grow w-full container mx-auto px-5 md:px-0 lg:px-8 flex items-center justify-center">
        <div className="w-full">
          <div className="mt-4">
            <h2 className="text-xl lg:text-2xl font-playFair text-headerTextColor font-semibold mb-8">
              Add Category
            </h2>
            <form onSubmit={categoryFormik.handleSubmit}>
              <Input
                label="Category name"
                name="name"
                placeholder="Ex. Drinks"
                icon={<BiCategoryAlt />}
                onChange={categoryFormik.handleChange}
                defaultValue={categoryFormik.values.name}
                onBlur={categoryFormik.handleBlur}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#d16d56] hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-10 rounded-md mt-5"
                >
                  {isLoading ? "Please wait..." : "Create category"}
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

export default AddCategory;
