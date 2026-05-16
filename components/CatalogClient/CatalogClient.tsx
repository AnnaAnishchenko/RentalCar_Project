// components/CatalogClient/CatalogClient.tsx
"use client";

import FilterForm, { FilterFormValues } from "../FilterForm/FilterForm";

type CatalogClientProps = {
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

export default function CatalogClient({ brands }: CatalogClientProps) {
  const handleSubmit = (values: FilterFormValues) => {
    console.log(values);
  };

  return <FilterForm brands={brands} onSubmit={handleSubmit} />;
}
