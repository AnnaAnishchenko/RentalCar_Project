"use client";

import { useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import FilterForm, { FilterFormValues } from "../FilterForm/FilterForm";

import CarCatalog from "../CarCatalog/CarCatalog";

import { getCars } from "@/lib/api";

import css from "./CatalogClient.module.css";
import CatalogLoader from "../CatalogLoader/CatalogLoader";
import Button from "../Button/Button";

type CatalogClientProps = {
  brands: string[];

  priceRange: {
    min: number;
    max: number;
  };
};

const CatalogClient = ({ brands, priceRange }: CatalogClientProps) => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterFormValues>({
    brand: searchParams.get("brand") || "",
    rentalPrice: searchParams.get("rentalPrice") || "",
    minMileage: searchParams.get("minMileage") || "",
    maxMileage: searchParams.get("maxMileage") || "",
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

    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
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
    return <CatalogLoader />;
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

      {cars.length > 0 ? (
        <CarCatalog cars={cars} />
      ) : (
        <p className={css.empty}>No cars found.</p>
      )}

      {hasNextPage && (
        <Button
          variant="outline"
          className={css.loadMoreBtn}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? <CatalogLoader /> : "Load More"}
        </Button>
      )}
    </section>
  );
};

export default CatalogClient;
