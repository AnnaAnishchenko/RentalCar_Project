import Image from "next/image";

import { Car } from "@/types/car";

import RentalForm from "../RentalForm/RentalForm";

import css from "./CarDetails.module.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoCarSportSharp } from "react-icons/io5";
import { GiGasPump } from "react-icons/gi";
import { BsGear } from "react-icons/bs";
import { PiRoadHorizon } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";

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

          <RentalForm carId={item.id} />
        </div>

        <div className={css.right}>
          <div className={css.box}>
            <h2 className={css.title}>
              {item.brand} {item.model}, {item.year}
              <span className={css.article}>Article:{item.stockNumber}</span>
            </h2>
            <div className={css.location}>
              <CiLocationOn className={css.icon} />
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
                  <li key={condition} className={css.list_item}>
                    <IoCheckmarkCircleOutline className={css.icon} />
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.section}>
              <h3 className={css.subtitle}>Specifications:</h3>

              <ul className={css.list}>
                <li className={css.list_item}>
                  <SlCalender className={css.icon} />
                  Year: {item.year}
                </li>
                <li className={css.list_item}>
                  <IoCarSportSharp className={css.icon} />
                  Type: {item.type}
                </li>
                <li className={css.list_item}>
                  <GiGasPump className={css.icon} />
                  Fuel Consumption: {item.fuelConsumption}
                </li>
                <li className={css.list_item}>
                  <BsGear className={css.icon} />
                  Engine: {item.engine}
                </li>
                <li className={css.list_item}>
                  <PiRoadHorizon className={css.icon} />
                  Mileage: {item.mileage}km
                </li>
              </ul>
            </div>
            <div className={css.section}>
              <h3 className={css.subtitle}>Features</h3>

              <ul className={css.list}>
                {item.features.map((feature) => (
                  <li key={feature} className={css.list_item}>
                    <IoCheckmarkCircleOutline className={css.icon} />
                    {feature}{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetails;
