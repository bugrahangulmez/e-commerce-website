import { createSlice } from "@reduxjs/toolkit";

interface Cart {
  id: number;
  products: CartItem[] | [];
  total: number;
  discountedTotal: number;
  userId?: number;
  totalProducts: number;
  totalQuantity: number;
}

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface InitialState {
  cart: Cart;
  cartList: CartItem[] | [];
}

const initialState: InitialState = {
  cart: {
    id: 1,
    products: [],
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
  },
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, { payload }: { payload: Product }) => {
      let discountAmount = payload.price * (payload.discountPercentage / 100);
      let newCartItem = {
        id: payload.id,
        title: payload.title,
        price: payload.price,
        quantity: 1,
        total: payload.price,
        discountPercentage: payload.discountPercentage,
        discountedPrice: payload.price - discountAmount,
      };
      state.cartList = [...state.cartList, newCartItem];
      let totalQuantityArr: number[] = state.cartList.map(
        (item) => item.quantity
      );
      let totalQuantity: number = totalQuantityArr.reduce(
        (total, num) => total + num
      );
      let sumArr: number[] = state.cartList.map(
        (item) => item.discountedPrice * item.quantity
      );
      let sum: number = sumArr.reduce((total, num) => total + num);
      let normalSumArr: number[] = state.cartList.map(
        (item) => item.price * item.quantity
      );
      let normalSum: number = normalSumArr.reduce((total, num) => total + num);
      state.cart = {
        id: 1,
        products: state.cartList,
        total: normalSum,
        discountedTotal: sum,
        totalProducts: state.cartList.length,
        totalQuantity: totalQuantity,
      };
    },
    removeCart: (state, { payload }: { payload: Product }) => {
      let removedItem = state.cartList.find((item) => item.id === payload.id);
      if (removedItem) {
        state.cart.totalQuantity =
          state.cart.totalQuantity - removedItem?.quantity;
      }
      if (removedItem) {
        state.cart.totalProducts = state.cart.totalProducts - 1;
      }
      if (removedItem) {
        let sum = state.cart.total - removedItem?.quantity * removedItem?.price;
        state.cart.total = sum;
      }
      if (removedItem) {
        let sum =
          state.cart.discountedTotal -
          removedItem?.discountedPrice * removedItem?.quantity;
        state.cart.discountedTotal = sum;
        if (state.cartList.length === 1) {
          state.cart.discountedTotal = 0;
        }
      }
      state.cartList = state.cartList.filter((item) => item.id !== payload.id);
    },
    increaseQuantity: (state, { payload }: { payload: CartItem }) => {
      state.cartList.forEach((item) => {
        if (item.id === payload.id) {
          return (
            (item.quantity += 1),
            (state.cart.totalQuantity += 1),
            (item.total = item.quantity * item.price),
            (state.cart.discountedTotal += item.discountedPrice),
            (state.cart.total += item.price)
          );
        }
      });
      state.cart.products = state.cartList;
      state.cart.totalProducts = state.cartList.length;
    },
    decreaseQuantity: (state, { payload }: { payload: CartItem }) => {
      state.cartList.forEach((item) => {
        if (item.id === payload.id) {
          return (
            (item.quantity -= 1),
            (state.cart.totalQuantity -= 1),
            (item.total = item.quantity * item.price),
            (state.cart.discountedTotal -= item.discountedPrice),
            (state.cart.total -= item.price)
          );
        }
      });
      state.cart.products = state.cartList;
      state.cart.totalProducts = state.cartList.length;
    },
    deleteFromCart: (state, { payload }: { payload: CartItem }) => {
      state.cart.products = state.cartList;
      state.cart.totalProducts = state.cartList.length;
      let removedItem = state.cartList.find((item) => item.id === payload.id);
      if (removedItem) {
        state.cart.totalQuantity -= removedItem.quantity;
      }
      if (removedItem) {
        state.cart.total -= removedItem.total;
      }
      if (removedItem) {
        state.cart.discountedTotal -=
          removedItem.discountedPrice * removedItem.quantity;
        if (state.cartList.length === 1) {
          state.cart.discountedTotal = 0;
        }
      }
      state.cartList = state.cartList.filter(
        (item) => item.title !== payload.title
      );
      state.cart.products = state.cartList;
      state.cart.totalProducts = state.cartList.length;
    },
  },
});

export default cartSlice.reducer;

export const {
  addCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} = cartSlice.actions;
