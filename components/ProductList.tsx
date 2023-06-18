"use client";

import { addCart, removeCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProducts, setProductsAll } from "@/redux/shopSlice";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import { useEffect } from "react";

const ProductList = ({ products }: { products: Product[] }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setProducts(products));
    dispatch(setProductsAll(products));
  }, []);
  const {
    isCategoriesOpen,
    products: productList,
    productsAll,
  } = useAppSelector((store) => store.shop);
  const { cartList } = useAppSelector((store) => store.cart);
  let cartItemNames = cartList.map((item) => item.title);
  return (
    <div
      className={`absolute right-0 grid grid-cols-4 ${
        isCategoriesOpen ? "w-10/12" : "w-screen"
      }`}
    >
      {productList.map((item) => (
        <div
          key={item.id}
          className="m-5 p-5 h-[350px] border border-black flex flex-col justify-between items-center"
        >
          <Link href={item.id.toString()}>
            <Image
              className="max-h-36"
              src={item.images[0]}
              width={150}
              height={150}
              alt={item.title}
            />
          </Link>
          <section className="flex flex-col items-center gap-5">
            <Link
              className="flex flex-col items-center"
              href={item.id.toString()}
            >
              <h2>{item.title}</h2>
              <h2>{item.price}</h2>
            </Link>
            <button
              className="text-green-600 underline"
              onClick={() => {
                cartItemNames.includes(item.title)
                  ? dispatch(removeCart(item))
                  : dispatch(addCart(item));
              }}
            >
              {cartItemNames.includes(item.title) ? "Remove" : "Add"}
            </button>
            {/* <button
              className="text-green-600 underline"
              onClick={() => {
                dispatch(removeCart(item));
              }}
            >
              Remove
            </button> */}
          </section>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
