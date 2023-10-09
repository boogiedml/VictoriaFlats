import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLink, Input, Select } from "../components";
import { BiCategoryAlt, BiFoodTag } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { BsImage } from "react-icons/bs";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get("/category");
        setCategories(response?.data?.categoryList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCat();
  }, []);

  const productFormik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Rental name is required"),
      price: Yup.string().required("Rental price is required"),
      category: Yup.string().required("Category is required"),
      image: Yup.string().required("Rental image is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setIsLoading(true);
      const url = "/product";
      const config = {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.post(url, values, config);
        console.log(data);
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
      <nav>
        <div className="bg-white fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
          <div className="logo text-xl md:text-2xl lg:text-3xl font-playFair font-semibold">
            AnneLousia
          </div>
          <ButtonLink title="Sign Out" link="/signin" />
        </div>
      </nav>
      <section className="flex-grow w-full px-5 md:px-10 lg:px-14 xl:px-20 mt-28 lg:mt-0 mb-8 flex items-center justify-center">
        <div className="w-full">
          <div>
            <h2 className="text-xl lg:text-2xl font-playFair text-headerTextColor font-semibold mb-8">
              Add Rental
            </h2>
            <form onSubmit={productFormik.handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-9">
                <Input
                  label="Rental Name"
                  name="name"
                  placeholder="Ex. Coke"
                  icon={<BiFoodTag />}
                  onChange={productFormik.handleChange}
                  defaultValue={productFormik.values.name}
                  onBlur={productFormik.handleBlur}
                />

                <Select
                  label="Category"
                  option={categories}
                  name="category"
                  icon={<BiCategoryAlt />}
                  onChange={productFormik.handleChange}
                  defaultValue={productFormik.values.category}
                  onBlur={productFormik.handleBlur}
                />
                <Input
                  label="Price"
                  name="price"
                  placeholder="Ex. 500"
                  icon={<GiPriceTag />}
                  onChange={productFormik.handleChange}
                  defaultValue={productFormik.values.price}
                  onBlur={productFormik.handleBlur}
                />
                <Input
                  label="Rental Image"
                  name="image"
                  type="file"
                  icon={<BsImage />}
                  fileFormik={productFormik}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#d16d56] hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-10 rounded-md mt-5"
                >
                  {isLoading ? "Please wait..." : "Create rental"}
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

export default AddProduct;
