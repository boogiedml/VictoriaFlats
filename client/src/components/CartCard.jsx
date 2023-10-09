import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import { MdClose } from "react-icons/md";

const CartCard = ({ imgUrl, productName, productPrice, product }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const item = state.cart.cartItems.find(
      (item) => item.product.id === product.id
    );
    return item ? item.quantity : 0;
  });

  const handleIncrement = () => {
    dispatch(incrementQuantity({ productId: product.id }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ productId: product.id }));
  };

  return (
    <div className="flex gap-5 md:gap-8 lg:gap-10 items-center pb-6 mb-6 border-b-[1px] border-gray-200">
      <div className="w-[120px] h-36 relative group">
        <img
          className="w-full object-cover h-full rounded-lg group-hover:blur-[1px] transition-all duration-300"
          src={imgUrl}
          alt={productName}
        />
        <div className="hidden group-hover:block scale-0 group-hover:scale-100 transition duration-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full cursor-pointer">
          <MdClose
            onClick={() => dispatch(removeFromCart({ productId: product.id }))}
            size={16}
          />
        </div>
      </div>
      <div className="w-full flex justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="text-base font-[500]">{productName}</h4>
          <span className="flex items-center w-fit mt-2">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 bg-secondaryBackground text-white text-xl rounded-full focus:outline-none focus-visible:outline-none"
            >
              -
            </button>
            <p className="text-lg min-w-[50px] text-center cursor-default">
              {quantity}
            </p>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 bg-secondaryBackground text-white text-xl rounded-full focus:outline-none focus-visible:outline-none"
            >
              +
            </button>
          </span>
        </div>
        <p className="font-semibold text-base lg:text-lg font-mavenPro text-mainTextColor">
          ₦{productPrice * quantity}
        </p>
      </div>
    </div>
  );
};

CartCard.propTypes = {
  imgUrl: PropTypes.string,
  productName: PropTypes.string,
  productPrice: PropTypes.string,
  product: PropTypes.object,
};

export default CartCard;
