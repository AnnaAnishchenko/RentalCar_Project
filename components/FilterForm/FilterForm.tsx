"use client";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

import css from "./FilterForm.module.css";

export interface FilterFormValues {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

type FilterFormProps = {
  brands: string[];

  priceRange: {
    min: number;
    max: number;
  };

  onSubmit: (values: FilterFormValues) => void;

  onClearFilters: () => void;
};

const FilterForm = ({
  brands,
  priceRange,
  onSubmit,
  onClearFilters,
}: FilterFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues: FilterFormValues = {
    brand: searchParams.get("brand") || "",
    rentalPrice: searchParams.get("rentalPrice") || "",
    minMileage: searchParams.get("minMileage") || "",
    maxMileage: searchParams.get("maxMileage") || "",
  };

  const prices: number[] = [];

  for (let i = priceRange.min; i <= priceRange.max; i += 10) {
    prices.push(i);
  }

  const handleSubmit = (
    values: FilterFormValues,
    actions: FormikHelpers<FilterFormValues>,
  ) => {
    if (
      values.minMileage &&
      values.maxMileage &&
      Number(values.minMileage) > Number(values.maxMileage)
    ) {
      actions.setFieldError(
        "maxMileage",
        "Maximum mileage must be greater than minimum mileage",
      );
      actions.setSubmitting(false);
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (values.brand) {
      params.set("brand", values.brand);
    } else {
      params.delete("brand");
    }
    if (values.rentalPrice) {
      params.set("rentalPrice", values.rentalPrice);
    } else {
      params.delete("rentalPrice");
    }
    if (values.minMileage) {
      params.set("minMileage", values.minMileage);
    } else {
      params.delete("minMileage");
    }
    if (values.maxMileage) {
      params.set("maxMileage", values.maxMileage);
    } else {
      params.delete("maxMileage");
    }
    router.push(`/catalog?${params.toString()}`);

    onSubmit(values);

    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form className={css.FilterForm}>
          <div className={css.form}>
            <div className={css.fieldWrapper}>
              <label className={css.label} htmlFor="brand">
                Car brand
              </label>

              <Field as="select" id="brand" name="brand" className={css.select}>
                <option value="">Choose a brand</option>

                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Field>
            </div>

            <div className={css.fieldWrapper}>
              <label htmlFor="rentalPrice" className={css.label}>
                Price / 1 hour
              </label>

              <Field
                as="select"
                id="rentalPrice"
                name="rentalPrice"
                className={css.select}
              >
                <option value="">Choose a price</option>

                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </Field>
            </div>

            <div className={css.fieldWrapper}>
              <label className={css.label}>Car mileage / km</label>

              <div className={css.mileageGroup}>
                <Field
                  name="minMileage"
                  type="number"
                  placeholder="From"
                  className={css.mileageInput}
                />

                <Field
                  name="maxMileage"
                  type="number"
                  placeholder="To"
                  className={css.mileageInput}
                />
              </div>

              <ErrorMessage
                name="maxMileage"
                component="div"
                className={css.error}
              />
            </div>
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.button}>
              Search
            </button>

            <button
              type="button"
              className={css.clearButton}
              onClick={() => {
                resetForm();

                router.push("/catalog");

                onClearFilters();
              }}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
