import { Categories, ProductList } from "@/components";
import getProducts from "@/lib/getProducts";

export default async function Home() {
  const { products } = await getProducts();
  const categoryList = products.map((item) => item.category);
  const catSet = new Set(categoryList);
  const categoriesString = Array.from(catSet);
  const categories: CategoryObj[] = categoriesString.map((item) => ({
    categoryName: item,
    isSelected: false,
  }));
  return (
    <main className="mt-20 flex z-10">
      <Categories catgories={categories} />
      <ProductList products={products} />
    </main>
  );
}
