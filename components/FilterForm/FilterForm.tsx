"use client";

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

import Select from "react-select";
import { customSelectStyles, SelectOption } from "@/styles/selectStyles";

import css from "./FilterForm.module.css";
import Button from "../Button/Button";

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

  const brandOptions: SelectOption[] = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions: SelectOption[] = prices.map((price) => ({
    value: String(price),
    label: `${price}`,
  }));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form className={css.FilterForm}>
          <div className={css.form}>
            <div className={css.fieldWrapper}>
              <label className={css.label} htmlFor="brand">
                Car brand
              </label>

              <Select
                instanceId="brand-select"
                options={brandOptions}
                styles={customSelectStyles}
                placeholder="Choose a brand"
                value={
                  brandOptions.find(
                    (option) => option.value === values.brand,
                  ) || null
                }
                onChange={(option) =>
                  setFieldValue("brand", option?.value ?? "")
                }
                isClearable={false}
              />
            </div>

            <div className={css.fieldWrapper}>
              <label htmlFor="rentalPrice" className={css.label}>
                Price / 1 hour
              </label>

              <Select
                instanceId="price-select"
                options={priceOptions}
                styles={customSelectStyles}
                placeholder="Choose a price"
                value={
                  priceOptions.find(
                    (option) => option.value === values.rentalPrice,
                  ) || null
                }
                onChange={(option) =>
                  setFieldValue("rentalPrice", option?.value ?? "")
                }
                isClearable={false}
              />
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
            <Button
              type="submit"
              variant="primary"
              className={css.searchButton}
            >
              Search
            </Button>

            <Button
              variant="text"
              className={css.clearButton}
              onClick={() => {
                resetForm();
                router.push("/catalog");
                onClearFilters();
              }}
            >
              Clear filters
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
