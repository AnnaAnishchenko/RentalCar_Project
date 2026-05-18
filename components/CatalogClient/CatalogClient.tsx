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

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],

    queryFn: ({ pageParam }) =>
      getCars({
        pageParam,
        ...filters,
      }),

    initialPageParam: 1,

    // getNextPageParam: (lastPage, allPages) => {
    //   if (lastPage.cars.length < 10) {
    //     return undefined;
    //   }

    //   return allPages.length + 1;
    // },
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading cars</p>;
  }

  return (
    <section className={css.catalog}>
      <FilterForm
        brands={brands}
        priceRange={priceRange}
        onSubmit={handleSubmit}
        onClearFilters={handleClearFilters}
      />

      {/* <CarCatalog cars={cars} /> */}

      {cars.length > 0 ? (
        <CarCatalog cars={cars} />
      ) : (
        <p className={css.empty}>No cars found.</p>
      )}

      {hasNextPage && (
        <button
          type="button"
          className={css.loadMoreBtn}
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
