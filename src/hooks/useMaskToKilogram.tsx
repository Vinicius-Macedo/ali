import React, { useState, useCallback, KeyboardEvent } from "react";

export const useMaskToKilogram = (initialValue: string = "0,000") => {
  const [valueFormatted, setValueFormatted] = useState(initialValue);

  const handleKeyboardEvent = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
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
          valueFormatted = "0,000";
        }
      }

      setValueFormatted(valueFormatted);

      return { name, valueFormatted };
    },
    []
  );

  return [valueFormatted, handleKeyboardEvent];
};

const returnOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, "");
};
