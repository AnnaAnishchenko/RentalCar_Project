// //catalog/page.tsx

import CatalogClient from "@/components/CatalogClient/CatalogClient";
import { getFilters } from "@/lib/api";

const CatalogPage = async () => {
  const filters = await getFilters();

  return (
    <section>
      <CatalogClient brands={filters.brands} priceRange={filters.price} />
    </section>
  );
};

export default CatalogPage;
