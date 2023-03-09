import React, { useEffect } from "react";

type OptionFieldProps = {
  label: string;
  value?: string | number;
  name: string;
  avaibleOptions: any;
  usedOptions: any;
  onKeyUp?: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLSelectElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type itemArray = {
  id: number;
  description: string;
};

const noOptions = [
  {
    id: 0,
    category: "erro ao carregar",
  },
];

export function OptionField(props: OptionFieldProps) {
  const [options, setOptions] = React.useState<any>(noOptions);
  useEffect(() => {
    let newOptions = props.avaibleOptions;
    for (let i = 0; i < props.avaibleOptions.length; i++) {
      for (let j = 0; j < props.usedOptions.length; j++) {
        if (props.avaibleOptions[i].category === props.usedOptions[j].name) {
          newOptions.splice(i, 1);
          i--;
          break;
        }
      }
    }
    setOptions(newOptions);
  }, []);

  function removeMatchedItems(allItems: any, usedItems: any) {
    for (let i = 0; i < allItems.length; i++) {
      for (let j = 0; j < usedItems.length; j++) {
        if (allItems[i].category === usedItems[j].name) {
          allItems.splice(i, 1);
          i--;
          break;
        }
      }
    }
    return allItems;
  }

  return (
    <React.Fragment>
      <div className="system-input-container w-full">
        <select
          className="input-field "
          id={props.label
            .replace(/[^\w\s]/gi, "")
            .replace(/\s/g, "")
            .replace(/[A-Z]/g, "")
            .toLowerCase()}
          name={props.name}
          value={props.value}
          onKeyUp={props.onKeyUp}
          onKeyDown={props.onKeyDown}
          onChange={props.handleChange}
          required
        >
          <option value="">Selecione</option>
          {options
            .reduce((acc: any[], option: any) => {
              const found = acc.find(
                (op: any) =>
                  op.category.toLowerCase() === option.category.toLowerCase()
              );
              if (!found) {
                acc.push(option);
              }
              return acc;
            }, [])
            .sort((a: any, b: any) => a.category.localeCompare(b.category))
            .map((option: any) => (
              <option
                key={option.id}
                value={option.category}
                className="text-black"
              >
                {option.category.charAt(0).toUpperCase() +
                  option.category.slice(1)}
              </option>
            ))}
        </select>
        <span className="decoration"></span>
      </div>
    </React.Fragment>
  );
}
