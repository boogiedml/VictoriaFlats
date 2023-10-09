import React from "react";
import { Footer, Navbar } from "../containers";
import { useSelector } from "react-redux";
import { CartCard } from "../components";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const navigate = useNavigate();
  const totalPriceArr = cartItems.map(
    (c) => c.quantity * c.product.price
  );
  const totalPrice = totalPriceArr.reduce((prev, next) => prev + next, 0);

  return (
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-16">
        <h2 className="text-3xl lg:text-4xl font-playFair text-headerTextColor font-semibold">
          Cart
        </h2>
        <div className="mt-8 md:mt-14">
          {cartItems.length === 0 ? (
            <div>
              <div className="w-full flex items-center gap-4 bg-[#fbf4ea] p-5 rounded-md">
                <LuClipboardList size={20} className="text-blue-800" />
                Your cart is currently empty.
              </div>
              <div
                onClick={() => navigate("/rentals")}
                className="mt-8 uppercase py-2.5 px-10 font-mavenPro font-semibold cursor-pointer text-white bg-secondaryBackground w-fit rounded"
              >
                Return to rentals
              </div>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((p) => (
                  <CartCard
                    key={p.id}
                    imgUrl={p.product.image}
                    productName={p.product.name}
                    productPrice={p.product.price}
                    product={p.product}
                  />
                ))}
              </div>
              <div className="flex justify-end mt-10">
                <div className="bg-[#fbf4ea] w-full md:w-2/3 lg:w-1/2 py-9 px-3 md:px-6 rounded-lg">
                  <h4 className="text-xl lg:text-2xl font-playFair text-headerTextColor font-semibold pb-1 mb-3 border-b-[1px] border-gray-300">
                    Cart totals
                  </h4>
                  <div className="flex">
                    <h5 className="basis-1/3 p-3 text-lg font-600">Subtotal</h5>
                    <p className="basis-2/3 p-3 font-mavenPro text-lg font-[500]">
                      ₦{totalPrice}
                    </p>
                  </div>
                  <div className="flex">
                    <h5 className="basis-1/3 p-3 text-lg font-600">Total</h5>
                    <p className="basis-2/3 p-3 font-mavenPro text-lg font-[600]">
                      ₦{totalPrice}
                    </p>
                  </div>
                  <div
                    onClick={() => navigate("/checkout")}
                    className="mt-5 uppercase py-2.5 px-10 font-mavenPro font-semibold cursor-pointer text-white bg-secondaryBackground hover:bg-black transition-colors duration-500 w-full text-center rounded"
                  >
                    Proceed to checkout
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
