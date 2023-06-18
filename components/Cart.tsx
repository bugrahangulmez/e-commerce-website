"use client";

import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  removeCart,
} from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, cartList } = useAppSelector((store) => store.cart);
  return (
    <div className="mt-20 flex flex-col items-center">
      {cartList.map((item) => (
        <section className="w-1/3 flex flex-col items-center justify-center p-10 m-10 border border-black relative">
          <h1>{item.title}</h1>
          <p className="line-through">{item.price.toFixed(2)}$</p>
          <p>{item.discountedPrice.toFixed(2)}$</p>
          <section className="absolute right-10 flex flex-col">
            <button
              onClick={() => {
                dispatch(increaseQuantity(item));
              }}
            >
              +
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => {
                dispatch(decreaseQuantity(item));
              }}
            >
              -
            </button>
          </section>
          <button
            className="absolute bottom-1"
            onClick={() => {
              dispatch(deleteFromCart(item));
            }}
          >
            Remove
          </button>
        </section>
      ))}
      <h1>Total: {cart.discountedTotal.toFixed(2)}$</h1>
    </div>
  );
};
export default Cart;
