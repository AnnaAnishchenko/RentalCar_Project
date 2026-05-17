// components/CarCard/CarCard.tsx

import Image from "next/image";
import Link from "next/link";
import css from "./CarCard.module.css";
import { Car } from "@/types/car";

type Props = {
  item: Car;
};

const CarCard = ({ item }: Props) => {
  return (
    <li className={css.card}>
      <div className={css.car}>
        <Image
          className={css.car_image}
          src={item.img}
          alt={`${item.brand} ${item.model}`}
          width={244}
          height={268}
        />
        <div className={css.car_box}>
          <div className={css.car_info}>
            <h2 className={css.car_brand}>
              {item.brand} <span className={css.car_model}>{item.model}</span>,{" "}
              {item.year}
            </h2>

            <p className={css.car_price}>${item.rentalPrice}</p>
          </div>
        </div>

        <div className={css.car_description}>
          <p className={css.car_text}>
            {" "}
            {item.location.city} | {item.rentalCompany} |
          </p>
          <p className={css.car_text}>
            {item.type} | {item.mileage} km
          </p>
        </div>

        <Link
          href={`/catalog/${item.id}`}
          className={css.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Link>
      </div>
    </li>
  );
};

export default CarCard;
