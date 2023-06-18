export default async function getDetail(id: string) {
  const resp: Promise<Product> = await fetch(
    `https://dummyjson.com/products/${id}`
  ).then((res) => res.json());
  return resp;
}
