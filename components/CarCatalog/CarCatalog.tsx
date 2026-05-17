// components/CarCatalog/CarCatalog.tsx

import CarCard from "../CarCard/CarCard";
import { Car } from "@/types/car";

type Props = {
  cars: Car[];
};

const CarCatalog = ({ cars }: Props) => {
  return (
    <ul>
      {cars.map((car) => (
        <CarCard key={car.id} item={car} />
      ))}
    </ul>
  );
};

export default CarCatalog;
