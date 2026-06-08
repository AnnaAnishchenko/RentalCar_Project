"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

import css from "./RentalForm.module.css";
import { rentCar } from "@/lib/api";
import Button from "../Button/Button";

type Props = {
  carId: string;
};

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  comment: Yup.string(),
});

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
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            const response = await rentCar(carId, values);

            toast.success(response.message);

            actions.resetForm();
          } catch {
            toast.error("Something went wrong");
          }
        }}
      >
        {({ isValid, dirty }) => (
          <Form className={css.form}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={css.input}
            />
            <ErrorMessage name="name" component="div" className={css.error} />
            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={css.textarea}
            />

            <Button
              type="submit"
              variant="primary"
              className={css.sendButton}
              disabled={!isValid || !dirty}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RentalForm;
