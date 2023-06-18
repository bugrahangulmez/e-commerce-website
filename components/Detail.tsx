"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addCart, removeCart } from "@/redux/cartSlice";

const Detail = ({
  item,
  title,
  images,
  description,
  price,
  discountAmount,
}: {
  item: Product;
  title: string;
  images: string[];
  description: string;
  price: number;
  discountAmount: number;
}) => {
  const dispatch = useAppDispatch();

  const { cartList } = useAppSelector((store) => store.cart);
  let cartItemNames = cartList.map((item) => item.title);

  return (
    <div className="mt-32 gap-10 flex flex-col w-1/2 justify-center items-center bg-green-400 m-auto">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Image src={images[0]} width={300} height={500} alt={title} />
      <p>{description}</p>
      <section className="flex flex-col items-center">
        <p className="line-through">{price}$</p>
        <p>{(price - discountAmount).toFixed(2)}$</p>
      </section>
      <button
        onClick={() => {
          cartItemNames.includes(title)
            ? dispatch(removeCart(item))
            : dispatch(addCart(item));
        }}
      >
        {cartItemNames.includes(title) ? "Remove" : "Add"}
      </button>
    </div>
  );
};
export default Detail;
