import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import { RestaurantHeader } from "./components/header";

type RestaurantMenuPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
};

function isConsumptionMethodValid(consumptionMethod: string) {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantBySlug(slug, {
    include: { menuCategories: { include: { products: true } } },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
