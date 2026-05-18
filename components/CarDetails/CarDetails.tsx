//Component/CarDetails/CarDetails.tsx
import Image from "next/image";

import { Car } from "@/types/car";

import RentalForm from "../RentalForm/RentalForm";

import css from "./CarDetails.module.css";

type Props = {
  item: Car;
};

const CarDetails = ({ item }: Props) => {
  return (
    <div className={css.car_details}>
      <section className={css.wrapper}>
        <div className={css.left}>
          <Image
            src={item.img}
            alt={`${item.brand} ${item.model}`}
            width={640}
            height={512}
            className={css.image}
          />

          <RentalForm />
        </div>

        <div className={css.right}>
          <div className={css.box}>
            <h2 className={css.title}>
              {item.brand} {item.model}, {item.year}
              <span className={css.artical}>Artical:{item.stockNumber}</span>
            </h2>
            <div className={css.location}>
              {item.location.city}, {item.location.country}
            </div>
            <div className={css.price}>${item.rentalPrice}</div>
            <p className={css.description}>{item.description}</p>
          </div>

          <div className={css.box_section}>
            <div className={css.section}>
              <h3 className={css.subtitle}>Rental Conditions:</h3>

              <ul className={css.list}>
                {item.rentalConditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </div>
            <div className={css.section}>
              <h3 className={css.subtitle}>Specifications:</h3>

              <ul className={css.list}>
                <li>Year: {item.year}</li>
                <li>Type: {item.type}</li>
                <li>Fuel Consumption: {item.fuelConsumption}</li>
                <li>Engine: {item.engine}</li>
                <li>Mileage: {item.mileage}km</li>
              </ul>
            </div>
          </div>

          <div className={css.section}>
            <h3 className={css.subtitle}>Features</h3>

            <ul className={css.list}>
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
