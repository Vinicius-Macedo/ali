import React from "react";

type InputFieldProps = {
  label: string;
  value: string | number;
  name: string;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputField(props: InputFieldProps) {
  // remove spaces and accents

  return (
    <React.Fragment>
      <div className="system-input-container w-full">
        <input
          className="input-field"
          type={"text"}
          id={props.label
            .replace(/[^\w\s]/gi, "")
            .replace(/\s/g, "")
            .replace(/[A-Z]/g, "")
            .toLowerCase()}
          name={props.name}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
          onChange={props.handleChange}
          value={props.value}
          required
        />
        <label
          className="label-field"
          htmlFor={props.label
            .replace(/[^\w\s]/gi, "")
            .replace(/\s/g, "")
            .replace(/[A-Z]/g, "")
            .toLowerCase()}
        >
          {props.label}
        </label>
        <span className="decoration"></span>
      </div>
    </React.Fragment>
  );
}
