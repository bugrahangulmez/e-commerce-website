import { createSlice } from "@reduxjs/toolkit";

interface InitialStates {
  isCategoriesOpen: boolean;
  categories: CategoryObj[];
  products: Product[] | [];
  productsAll: Product[];
  selectedCategories: CategoryObj[] | [];
}

const initialState: InitialStates = {
  isCategoriesOpen: true,
  categories: [],
  products: [],
  productsAll: [],
  selectedCategories: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    toggleCategories: (state) => {
      state.isCategoriesOpen = !state.isCategoriesOpen;
    },
    setCategories: (state, { payload }: { payload: CategoryObj[] }) => {
      state.categories = payload;
    },
    setProducts: (state, { payload }: { payload: Product[] }) => {
      state.products = payload;
    },
    setProductsAll: (state, { payload }: { payload: Product[] }) => {
      state.productsAll = payload;
    },
    selectedCategories: (state, { payload }: { payload: CategoryObj[] }) => {
      state.selectedCategories = payload.filter(
        (item) => item.isSelected === true
      );
    },
    filterProducts: (state) => {
      let cat = state.selectedCategories.map((item) => item.categoryName);
      console.log(cat);
      if (cat.length > 0) {
        state.products = state.productsAll.filter((item) =>
          cat.includes(item.category)
        );
      }
      if (cat.length === 0) {
        state.products = state.productsAll;
      }
    },
    searchProduct: (state, { payload }: { payload: string }) => {
      state.products = state.productsAll.filter((item) =>
        item.title.toLowerCase().includes(payload)
      );
    },
  },
});

export default shopSlice.reducer;

export const {
  toggleCategories,
  setCategories,
  setProducts,
  setProductsAll,
  selectedCategories,
  filterProducts,
  searchProduct,
} = shopSlice.actions;
