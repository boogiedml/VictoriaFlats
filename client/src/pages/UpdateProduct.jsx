import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLink, Input } from "../components";
import { BiFoodTag } from "react-icons/bi";
import { GiPriceTag } from "react-icons/gi";
import { BsImage } from "react-icons/bs";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
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
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/product/${productId}`);
        const { product } = response?.data;
        // console.log(product);
        setProductDetails(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const productUpdateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productDetails?.name || "",
      price: productDetails?.price || "",
      category: productDetails?.category._id || "",
      image: productDetails?.image || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Rental name is required"),
      price: Yup.string().required("Rental price is required"),
      image: Yup.string(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const url = `/product/${productId}`;
      const config = {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const { data } = await axios.put(url, values, config);
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
              Update Rental
            </h2>
            <form onSubmit={productUpdateFormik.handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-9">
                <Input
                  label="Rental Name"
                  name="name"
                  placeholder="Ex. Coke"
                  onChange={productUpdateFormik.handleChange}
                  defaultValue={productUpdateFormik.values.name}
                  onBlur={productUpdateFormik.handleBlur}
                />
                <Input
                  label="Price"
                  name="price"
                  placeholder="Ex. 500"
                  onChange={productUpdateFormik.handleChange}
                  defaultValue={productUpdateFormik.values.price}
                  onBlur={productUpdateFormik.handleBlur}
                />
                <Input
                  label="Rental Image"
                  name="image"
                  type="file"
                  fileFormik={productUpdateFormik}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#d16d56] hover:bg-secondaryBackground transition-colors duration-500 uppercase font-mavenPro font-[600] text-white text-sm py-2.5 px-10 rounded-md mt-5"
                >
                  {isLoading ? "Please wait..." : "Update rental"}
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

export default UpdateProduct;
