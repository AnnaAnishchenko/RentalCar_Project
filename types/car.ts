// types/car.ts

export type Location = {
  country: string;
  city: string;
  address: string;
};

export type Car = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: Location;
  createdAt: string;
  updatedAt: string;
};

export type CarsResponse = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};