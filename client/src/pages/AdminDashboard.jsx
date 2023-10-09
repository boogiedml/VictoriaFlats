import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../containers";
import { ButtonLink, ProductCard } from "../components";
import { BiCategoryAlt, BiFoodTag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { rooms } from "../assets/constants";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);
  const token = Cookies.get("__v_i_va");

  // useEffect(() => {
  //   const fetchCat = async () => {
  //     try {
  //       const response = await axios.get("/category");
  //       setCategories(response?.data?.categoryList);
  //       // console.log(response?.data?.categoryList);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   const fetchPro = async () => {
  //     try {
  //       setIsLoadingProducts(true);
  //       const response = await axios.get("/product");
  //       // console.log(response?.data?.productList);
  //       setProducts(response?.data?.productList);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoadingProducts(false);
  //     }
  //   };

  //   fetchCat();
  //   fetchPro();
  // }, []);

  // const deleteProduct = async (productId) => {
  //   const config = {
  //     headers: {
  //       token: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     const response = await axios.delete(`/product/${productId}`, config);
  //     // If successful, update the product list
  //     if (response?.status === 204) {
  //       setProducts((prevProducts) =>
  //         prevProducts.filter((p) => p._id !== productId)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  return (
    <div className="flex flex-col relative min-h-screen">
      <nav>
        <div className="bg-white fixed top-0 z-30 w-full py-4 px-5 md:px-8 flex items-center justify-between gap-4">
          <div className="logo text-xl md:text-2xl lg:text-3xl font-playFair font-semibold">
            AnneLousia
          </div>
          <ButtonLink title="Sign Out" link="/signin" />
        </div>
      </nav>
      <section className="flex-grow w-full px-5 md:px-10 lg:px-14 xl:px-20 pt-28">
        <div className="mt-4">
          <h2 className="text-3xl font-playFair text-headerTextColor font-semibold">
            Dashboard
          </h2>
        </div>
        <div className="products_display my-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base lg:text-lg font-playFair text-mainTextColor">
              Categories
            </h3>
            <div
              className="button__link group relative bg-transparent py-2 m:py-2.5 px-8 md:px-10 font-mavenPro uppercase font-semibold cursor-pointer"
              onClick={() => navigate("/admin/add_category")}
            >
              <span className="text-white text-sm md:text-base group-hover:text-[#0C403A] relative z-10">
                Add category
              </span>
            </div>
          </div>
          <ul className="categories flex items-center gap-3 capitalize overflow-scroll">
            {/* {categories.map((c) => (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 1 }}
                className="w-fit max-w-[120px] cursor-pointer"
                key={c._id}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto bg-myGold rounded-full border-myGold border-4">
                  <img
                    src={c.image}
                    alt=""
                    className="w-full h-full object-cover bg-center rounded-full"
                  />
                </div>
                <p className="mt-2 text-center text-xs font-[500] uppercase line-clamp-2">
                  {c.name}
                </p>
              </motion.div>
            ))} */}
            <li className="text-sm uppercase py-2.5 px-4 font-mavenPro font-semibold cursor-pointer text-white bg-secondaryBackground w-fit text-center rounded">
              Chairs
            </li>
          </ul>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base lg:text-lg font-playFair text-mainTextColor">
                Products
              </h3>
              <div
                className="button__link group relative bg-transparent py-2 m:py-2.5 px-8 md:px-10 font-mavenPro uppercase font-semibold cursor-pointer"
                onClick={() => navigate("/admin/add_product")}
              >
                <span className="text-white text-sm md:text-base group-hover:text-[#0C403A] relative z-10">
                  Add product
                </span>
              </div>
            </div>
            <div>
              {/* {isLoadingProducts ? (
                <div className="w-full min-h-[400px] md:min-h-[250px] flex justify-center items-center">
                  <ClipLoader size={30} color="#040D12" />
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                  {products.map((p) => (
                    <ProductCard
                      key={p._id}
                      admin={true}
                      productDetails={p}
                      onDelete={deleteProduct}
                    />
                  ))}
                </div>
              )} */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-5">
                {products.map((p, i) => (
                  <ProductCard
                    key={i}
                    product={p}
                    imgUrl={p.imgUrl}
                    productCategory={p.productType}
                    productName={p.productName}
                    productPrice={p.productPrice}
                    admin={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-secondaryBackground">
        <div className="copyright py-5 text-center text-sm text-gray-300 font-mavenPro">
          Copyright © 2023 AnneLousia.com
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
