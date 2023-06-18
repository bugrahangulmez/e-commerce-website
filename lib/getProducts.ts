export default async function getProducts() {
  const resp: Promise<FetchProductResponse> = await fetch(
    "https://dummyjson.com/products?limit=0"
  ).then((res) => res.json());
  return resp;
}
