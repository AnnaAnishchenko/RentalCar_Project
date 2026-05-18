import CarCard from "../CarCard/CarCard";
import { Car } from "@/types/car";
import css from "./CarCatalog.module.css";

type Props = {
  cars: Car[];
};

const CarCatalog = ({ cars }: Props) => {
  return (
    <div className={css.car_catalog}>
      <ul className={css.catalog}>
        {cars.map((car) => (
          <CarCard key={car.id} item={car} />
        ))}
      </ul>
    </div>
  );
};

export default CarCatalog;
