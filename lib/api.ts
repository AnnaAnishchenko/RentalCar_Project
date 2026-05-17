// src/lib/api.ts

import axios from "axios";

import { CarsResponse, Car } from "../types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

type GetCarsParams = {
  pageParam?: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

export type FiltersResponse = {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
};

export const getCars = async ({
  pageParam = 1,
  brand,
  rentalPrice,
  minMileage,
  maxMileage,
}: GetCarsParams = {}): Promise<CarsResponse> => {
  const params: Record<string, string | number> = {
    page: pageParam,
  };

  if (brand?.trim()) {
    params.brand = brand;
  }

  if (rentalPrice?.trim()) {
    params.rentalPrice = rentalPrice;
  }

  if (minMileage?.trim()) {
    params.minMileage = minMileage;
  }

  if (maxMileage?.trim()) {
    params.maxMileage = maxMileage;
  }

  const response = await api.get<CarsResponse>("/cars", {
    params,
  });

  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);

  return response.data;
};

export const getFilters = async (): Promise<FiltersResponse> => {
  const response = await api.get<FiltersResponse>("/cars/filters");

  return response.data;
};
