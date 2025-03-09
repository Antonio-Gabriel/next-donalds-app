import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import { ConsumptionMethodOption } from "./components/consumptions-method-option";

type RestaurantPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />

        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos a oferecer
          practividade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          imageUrl="/dine_in.png"
          imageAlt="para comer aqui"
          buttonText="Para comer aqui"
        />

        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          imageUrl="/takeaway.png"
          imageAlt="para levar"
          buttonText="Para levar"
        />
      </div>
    </div>
  );
}
