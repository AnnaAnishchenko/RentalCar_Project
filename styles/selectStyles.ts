// src/styles/selectStyles.ts

import { StylesConfig } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

export const customSelectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    width: 204,
    minHeight: 44,
    borderRadius: 12,
    border: state.isFocused ? "1px solid #3470ff" : "1px solid transparent",
    backgroundColor: "#ffffff",
    boxShadow: "none",
    cursor: "pointer",

    "&:hover": {
      border: "1px solid #3470ff",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 16px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#101828",
  }),

  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #ffffff",
    boxShadow: "0 4px 36px rgba(0, 0, 0, 0.02)",
    zIndex: 50,
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: 272,
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    color: state.isSelected ? "#101828" : "#8d929a",
    cursor: "pointer",

    ":hover": {
      backgroundColor: "#f7f7f7",
      color: "#101828",
    },
  }),

  placeholder: (base) => ({
    ...base,
    color: "#101828",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#101828",
  }),
};
