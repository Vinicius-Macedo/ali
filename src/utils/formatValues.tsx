import React, { KeyboardEvent } from "react";

export const maskToKilogram = (e: KeyboardEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  let valueFormatted = returnOnlyNumbers(value);

  if (e.type === "keyup") {
    if (
      valueFormatted === "" ||
      valueFormatted.split("").every((char) => /^0$/.test(char)) ||
      valueFormatted === "0000" ||
      valueFormatted.length <= 3
    ) {
      valueFormatted = "0000";
    }
  } else if (e.type === "keydown") {
    if (valueFormatted === "0000" && e.key === "Backspace") {
      e.preventDefault();
    } else if (valueFormatted[0] === "0" && e.key >= "0" && e.key <= "9") {
      valueFormatted = value.slice(1);
    } else if (e.key === "Backspace") {
      valueFormatted = "0000";
    }
  }

  return { name, valueFormatted };
};

export const formatToKilogram = (value: string) => {
  value = returnOnlyNumbers(value);

  if (!value || value === "0") {
    value = "0000";
  } else if (value.length <= 3) {
    while (value.length < 4) {
      value = "0" + value;
    }
  }

  while (value.length > 4 && value[0] === "0") {
    value = value.slice(1);
  }

  return value
    .replace(/(\d)(\d{3})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

export const maskToMoney = (e: KeyboardEvent<HTMLInputElement>) => {
  const { name, value } = e.currentTarget;
  let valueFormatted = returnOnlyNumbers(value);

  if (e.type === "keyup") {
    if (!valueFormatted || valueFormatted.length <= 2) {
      valueFormatted = "000";
    }
    return { name, valueFormatted };
  } else if (e.type === "keydown") {
    if (valueFormatted === "000" && e.key === "Backspace") {
      e.preventDefault();
    } else if (value[0] === "0" && /^\d$/.test(e.key)) {
      valueFormatted = value.slice(1);
    } else if (e.key === "Backspace") {
      valueFormatted = "000";
    }
  }

  return { name, valueFormatted };
};

export const formatToMoney = (value: string) => {
  value = returnOnlyNumbers(value);

  if (!value || value === "0") {
    value = "000";
  } else if (value.length <= 2) {
    while (value.length < 3) {
      value = "0" + value;
    }
  }

  while (value.length > 3 && value[0] === "0") {
    value = value.slice(1);
  }

  return value
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

export function handleKeyboardEvent(
  e: React.KeyboardEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<any>>,
  mask?: string
) {
  let name: string | undefined;
  let valueFormatted: string | undefined;
  let value: any;

  switch (mask) {
    case "kilogram":
      ({ name, valueFormatted } = maskToKilogram(e));
      setForm((prev: any) => ({ ...prev, [name!]: valueFormatted }));
      break;
    case "money":
      ({ name, valueFormatted } = maskToMoney(e));

      setForm((prev: any) => ({ ...prev, [name!]: valueFormatted }));
      break;
    default:
      ({ name, value } = e.target as HTMLInputElement);
      setForm((prev: any) => ({ ...prev, [name!]: value }));
      break;
  }
}

export function handleChange(
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  setForm: React.Dispatch<React.SetStateAction<any>>
) {
  const { name, value } = e.target as HTMLInputElement;
  setForm((prev: any) => ({ ...prev, [name]: value }));
}

const returnOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};
