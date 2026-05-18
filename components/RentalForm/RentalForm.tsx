"use client";

import { Formik, Form, Field } from "formik";

import css from "./RentalForm.module.css";
import { rentCar } from "@/lib/api";

type Props = {
  carId: string;
};

const RentalForm = ({ carId }: Props) => {
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your car now</h3>

      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          comment: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await rentCar(carId, values);

            alert(response.message);

            actions.resetForm();
          } catch (error) {
            alert("Something went wrong");
          }
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            name="name"
            placeholder="Name*"
            className={css.input}
          />

          <Field
            type="email"
            name="email"
            placeholder="Email*"
            className={css.input}
          />

          <Field
            as="textarea"
            name="comment"
            placeholder="Comment"
            className={css.textarea}
          />

          <button type="submit" className={css.button}>
            Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RentalForm;
