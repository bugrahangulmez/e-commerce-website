"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  searchProduct,
  setProducts,
  toggleCategories,
} from "@/redux/shopSlice";
import { useState } from "react";

export default function Header() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { productsAll } = useAppSelector((store) => store.shop);
  return (
    <header className="fixed top-0 flex bg-red-500 h-20 w-screen z-20">
      <div className="flex w-1/12 justify-center items-center">
        <button
          onClick={() => {
            dispatch(toggleCategories());
          }}
        >
          <Image
            src={"/list_FILL0_wght400_GRAD0_opsz48.svg"}
            width={60}
            height={60}
            alt="Categories"
          />
        </button>
      </div>
      <div className="flex w-10/12 flex-col justify-center items-center">
        <Link href={"/"}>
          <h1>E Commerce Website</h1>
        </Link>
        <input
          value={text}
          type="text"
          onChange={({ target }) => setText(target.value)}
        />
        <section className="flex gap-4">
          <button
            onClick={() => {
              dispatch(searchProduct(text.toLowerCase()));
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              dispatch(setProducts(productsAll));
              setText("");
            }}
          >
            All Products
          </button>
        </section>
      </div>
      <div className="flex w-1/12 justify-center items-center">
        <Link href={"cart"}>
          <Image
            src={"/shopping_cart_FILL0_wght400_GRAD0_opsz48 (1).svg"}
            width={60}
            height={60}
            alt="Basket"
          />
        </Link>
      </div>
    </header>
  );
}
