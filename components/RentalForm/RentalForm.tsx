//components/RentalForm/RentalForm.tsx

"use client";

import { Formik, Form, Field } from "formik";

import css from "./RentalForm.module.css";

const RentalForm = () => {
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
          bookingDate: "",
          comment: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);

          alert("Car successfully rented!");

          actions.resetForm();
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
