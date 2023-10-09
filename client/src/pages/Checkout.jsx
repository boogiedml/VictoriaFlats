import React, { useState } from "react";
import { Footer, Navbar } from "../containers";
import { Input } from "../components";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const totalPriceArr = cartItems.map(
    (c) => c.quantity * c.product.price
  );
  const totalPrice = totalPriceArr.reduce((prev, next) => prev + next, 0);

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
      return "1";
    } else {
      const days = Math.ceil(hourDifference / 24);
      return days;
    }
  };

  // Example usage:
  const hourDifference = calculateHourDifference();
  const daysString = convertToDays(hourDifference);

  return (
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-16">
        <h2 className="text-3xl lg:text-4xl font-playFair text-headerTextColor font-semibold">
          Checkout
        </h2>
        <div className="mt-8 md:mt-14">
          <h4 className="mb-4 text-lg font-playFair text-headerTextColor font-[500]">
            Billing Address
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Your Name" placeholder="your name..." />
            <Input label="Your Email" placeholder="your email..." />
            <Input label="Your Phone" placeholder="Phone" />
            <Input label="Address" placeholder="Address" />
            <Input label="City" placeholder="City" />
            <Input label="State" placeholder="State" />
            <Input
              label="From"
              type="datetime-local"
              value={fromDateTime}
              onChange={(e) => setFromDateTime(e.target.value)}
            />
            <Input
              label="To"
              type="datetime-local"
              value={toDateTime}
              onChange={(e) => setToDateTime(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8">
          <h4 className="mb-4 text-lg font-playFair text-headerTextColor font-[500]">
            Your Order
          </h4>
          <div className="border-t-[1px] border-gray-300">
            <div className="flex border-b-[1px] border-gray-300">
              <p className="basis-2/3 p-4 font-semibold">Product</p>
              <p className="basis-1/3 p-4 font-semibold">Subtotal</p>
            </div>
            <>
              {cartItems.map((c) => (
                <div key={c.product.id} className="flex">
                  <p className="basis-2/3 p-4 overflow-hidden whitespace-nowrap text-ellipsis">
                    {c.product.name} × {c.quantity}
                  </p>
                  <p className="basis-1/3 p-4 font-mavenPro text-lg">
                    ₦{c.product.price * c.quantity}
                  </p>
                </div>
              ))}
            </>
            <div className="flex border-y-[1px] border-gray-300">
              <p className="basis-2/3 p-4 font-semibold">Subtotal</p>
              <p className="basis-1/3 p-4 font-semibold font-mavenPro text-lg">
                ₦{totalPrice}
              </p>
            </div>
            <div className="flex border-b-[1px] border-gray-300">
              <p className="basis-2/3 p-4 font-semibold">Total</p>
              <p className="basis-1/3 p-4 font-semibold font-mavenPro text-lg">
                ₦{totalPrice * daysString}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mt-8 uppercase py-2.5 px-10 font-mavenPro font-semibold cursor-pointer text-white bg-secondaryBackground w-full md:w-fit text-center rounded">
              Place order
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
