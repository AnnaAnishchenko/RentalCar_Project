import type { Metadata } from "next";

import CatalogClient from "@/components/CatalogClient/CatalogClient";
import { getFilters } from "@/lib/api";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description: "Browse available rental cars",
};

const CatalogPage = async () => {
  const filters = await getFilters();

  return (
    <section>
      <CatalogClient brands={filters.brands} priceRange={filters.price} />
    </section>
  );
};

export default CatalogPage;
