import paystack from "paystack";
import axios from "axios";

const bookingPayment = async ({ email, name, amount, bookingId }) => {
  const payStackInstance = paystack(process.env.PAYSTACK_SECRET_KEY);
  console.log(process.env.PAYSTACK_SECRET_KEY);
  console.log(amount);
  try {
    const paystackResponse = await payStackInstance.transaction.initialize({
      email,
      name,
      amount: amount * 100,
      callback_url: `https://victoria-flats.onrender.com/booking-confirmation/${bookingId}`,
    });

    console.log(paystackResponse);
    const paymentReference = paystackResponse.data;
    return {
      data: paymentReference,
    };
  } catch (error) {
    throw error;
  }
};

const verifyPaymentStatus = async (paymentReference) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${paymentReference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { bookingPayment, verifyPaymentStatus };
