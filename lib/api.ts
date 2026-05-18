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

type RentalFormData = {
  name: string;
  email: string;
  comment: string;
};

export type BookingResponse = {
  message: string;
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
    perPage: 12,
  };

  if (brand?.trim()) {
    params.brand = brand;
  }

  if (rentalPrice?.trim()) {
    params.price = Number(rentalPrice);
  }

  if (minMileage && !isNaN(Number(minMileage))) {
    params.minMileage = parseInt(minMileage, 10);
  }

  if (maxMileage && !isNaN(Number(maxMileage))) {
    params.maxMileage = parseInt(maxMileage, 10);
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

export const rentCar = async (
  carId: string,
  data: RentalFormData,
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>(
    `/cars/${carId}/booking-requests`,
    data,
  );

  return response.data;
};
