import React, { useState, useEffect } from "react";

const FormattedNumberInput: React.FC = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      value
        .split("")
        .reverse()
        .reduce((acc, curr, index) => {
          if (index === 2) {
            return "," + curr + acc;
          } else if (index > 2 && (index - 2) % 3 === 0) {
            return "." + curr + acc;
          } else {
            return curr + acc;
          }
        }, "")
    );
  }, [value]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default FormattedNumberInput;
