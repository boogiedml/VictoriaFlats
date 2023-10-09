import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../containers";
// import { products } from "../assets/constants";
import { ProductCard } from "../components";
import axios from "../../api/axios";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

const Rentals = () => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPro = async () => {
      try {
        setIsLoadingProducts(true);
        const response = await axios.get("/products");
        console.log(response?.data?.productList);
        setProducts(response?.data?.productList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchPro();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <section className="flex-grow px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl lg:text-4xl font-playFair text-headerTextColor font-semibold">
            Shop
          </h2>
          search
        </div>
        {isLoadingProducts ? (
          <div className="w-full h-[500px] flex justify-center items-center">
            <ClipLoader size={40} color="#0C403A" />
          </div>
        ) : !products.length === 0 ? (
          <div className="w-full h-[500px] flex justify-center items-center text-center text-myBrown font-grotesk mt-4">
            No matching meal found.
          </div>
        ) : (
          <div className="mt-8 md:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                imgUrl={p.image}
                productCategory={p.category.name}
                productName={p.name}
                productPrice={p.price}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Rentals;
