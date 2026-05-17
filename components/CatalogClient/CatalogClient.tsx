// components/CatalogClient/CatalogClient.tsx
"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import FilterForm, { FilterFormValues } from "../FilterForm/FilterForm";
import CarCatalog from "../CarCatalog/CarCatalog";

import { getCars } from "@/lib/api";

import css from "./CatalogClient.module.css";

type CatalogClientProps = {
  brands: string[];

  priceRange: {
    min: number;
    max: number;
  };
};
const CatalogClient = ({ brands, priceRange }: CatalogClientProps) => {
  const [filters, setFilters] = useState<FilterFormValues>({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cars", filters],

      queryFn: ({ pageParam = 1 }) =>
        getCars({
          pageParam,
          ...filters,
        }),

      initialPageParam: 1,

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }

        return undefined;
      },
    });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleSubmit = (values: FilterFormValues) => {
    setFilters(values);
  };

  const handleClearFilters = () => {
    setFilters({
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    });
  };

  return (
    <section className={`${css.catalog} ${css.container}`}>
      <FilterForm
        brands={brands}
        priceRange={priceRange}
        onSubmit={handleSubmit}
        onClearFilters={handleClearFilters}
      />

      <CarCatalog cars={cars} />

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </section>
  );
};

export default CatalogClient;
