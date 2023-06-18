import getDetail from "@/lib/getDetail";
import { Detail } from "@/components";

export default async function page({
  params: { product },
}: {
  params: { product: string };
}) {
  const { title, images, description, price, discountPercentage } =
    await getDetail(product);

  const item = await getDetail(product);
  let discountAmount = (price / 100) * discountPercentage;
  return (
    <Detail
      item={item}
      title={title}
      images={images}
      description={description}
      price={price}
      discountAmount={discountAmount}
    />
  );
}
