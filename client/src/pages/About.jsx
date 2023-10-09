import React from "react";
import { Footer, Navbar } from "../containers";
import AboutImg from "../assets/table-4-680x800.jpg";

const About = () => {
  const bgStyles = {
    backgroundImage: `url(https://demo.webdevia.com/partytent-event-eental-wordPress-theme/wp-content/uploads/2022/07/bg-3.jpg?id=11185)`,
    width: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    backgroundAttachment: "fixed",
  };

  return (
    <>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pt-32 pb-14 md:pb-20">
        <h2 className="text-3xl lg:text-4xl text-headerTextColor font-playFair font-semibold">
          About
        </h2>
        <div className="mt-8 md:mt-14 flex flex-col lg:flex-row">
          <div className="basis-1/2 xl:pr-16 lg:pt-10">
            <h3 className="text-2xl lg:text-3xl font-playFair font-semibold mb-5">
              We are Event Rentals Company with a mission!
            </h3>
            <p className="font-mavenPro text-[17px] leading-8 mb-10">
              Are you looking for a tent? Well look no more! We have the stretch
              tents that you need for all of your event needs, big or small!
            </p>
            <div className="mb-5">
              <h4 className="text-xl lg:text-2xl font-playFair font-semibold mb-2">
                Event Rentals
              </h4>
              <p className="leading-[2]">
                The modern world is in a continuous movement and people
                everywhere are looking for quick, safe means of accessing
                accurate information. Prompt information is vital.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl lg:text-2xl font-playFair font-semibold mb-2">
                Corporate Events
              </h4>
              <p className="leading-[2]">
                The modern world is in a continuous movement and people
                everywhere are looking for quick, safe means of accessing
                accurate information. Prompt information is vital.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl lg:text-2xl font-playFair font-semibold mb-2">
                Booth Desgin
              </h4>
              <p className="leading-[2]">
                The modern world is in a continuous movement and people
                everywhere are looking for quick, safe means of accessing
                accurate information. Prompt information is vital.
              </p>
            </div>
          </div>
          <div className="basis-1/2 lg:pl-6 xl:pl-10 pt-5 lg:pt-10 xl:pt-0">
            <img src={AboutImg} alt="About Image" />
          </div>
        </div>
      </section>
      <section style={bgStyles} className="py-56"></section>
      <section className="px-5 md:px-10 lg:px-14 xl:px-20 pb-14">
        <div className="mt-14">
          <h2 className="text-3xl lg:text-4xl font-playFair font-semibold">
            RENTAL POLICY
          </h2>
          <div className="mt-8">
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Rental Period
              </h4>
              <p className="leading-[2]">
                Our rental period is typically 24 hours, with pickup and return
                times specified in the rental agreement. Additional rental days
                can be arranged at an additional cost.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Deposit
              </h4>
              <p className="leading-[2]">
                A non-refundable deposit of 60% of the rental fee is required to
                reserve the rental items. Payment: The outstanding balance is
                due at least 2 days to the event date and can be paid by card or
                bank transfer. We do not accept cash payment.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Delivery
              </h4>
              <p className="leading-[2]">
                All delivery and pickup should be done between the hours of
                9.00am and 5.00pm, Monday through Saturday. We require at least
                48 hours’ notice for any delivery or pick up requests. For
                Sunday deliveries and pickups, please contact us in advance to
                make arrangement
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Cancellation Policy
              </h4>
              <p className="leading-[2]">
                A cancellation made at least 30 days before the rental date will
                receive a full refund of the deposit. Cancellation made less
                than 30 days before the rental date will forfeit the deposit.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Damage Policy
              </h4>
              <p className="leading-[2]">
                The client is responsible for any damage to the rental items
                during the rental period and will be charged for the full
                replacement cost of any damaged items.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Late Fees
              </h4>
              <p className="leading-[2]">
                A late fee of 25% of the daily rental fee will be charged for
                each. Day that the rental items are not returned on time. Any
                late fee will be deducted from the deposit.
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-xl font-playFair font-semibold mb-2 text-headerTextColor">
                Cleaning Fees
              </h4>
              <p className="leading-[2]">
                The rental items must be retuned in clean and undamaged
                condition. A cleaning fee is charged if the rental items are
                returned dirty or require additional cleaning.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
