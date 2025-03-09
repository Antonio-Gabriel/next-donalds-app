import { Prisma } from "@prisma/client";

import { db } from "@/lib/prisma";

type RestaurantArgs = Prisma.RestaurantFindUniqueArgs;

type RestaurantWithMenuCategories = Prisma.RestaurantGetPayload<{
  include: { menuCategories: { include: { products: true } } };
}>;

export async function getRestaurantBySlug(
  slug: string,
  args?: Omit<RestaurantArgs, 'where'>,
): Promise<RestaurantWithMenuCategories | null> {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
    ...args,
  });

  return restaurant as RestaurantWithMenuCategories | null;
}
