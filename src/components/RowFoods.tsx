import React from "react";
import { TextField } from "./TextField";
import { GenericApi } from "../utils/genericApi";
import {
  maskToKilogram,
  formatToKilogram,
  maskToMoney,
  formatToMoney,
  handleChange,
} from "../utils/formatValues";

type FormProps = {
  id: number;
  date: string;
  category: string;
  description: string;
  quantity: number;
  used: number;
  total: number;
  total_for_calc: number;
};

export function RowFoods(props: FormProps) {
  const [form, setForm] = React.useState<FormProps>(props);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let foodApi = new GenericApi("api/food");

  function handleKeyboardEvent(
    e: React.KeyboardEvent<HTMLInputElement>,
    mask?: string
  ) {
    let name: string | undefined;
    let valueFormatted: string | undefined;
    let value: any;

    switch (mask) {
      case "kilogram":
        ({ name, valueFormatted } = maskToKilogram(e));
        if (+valueFormatted > form.quantity) {
          alert("Valor usado não pode ser maior que a quantidade!");
          window.location.reload();
        }
        setForm((prev) => ({ ...prev, [name!]: valueFormatted }));
        break;
      case "money":
        ({ name, valueFormatted } = maskToMoney(e));

        setForm((prev) => ({ ...prev, [name!]: valueFormatted }));
        break;
      default:
        ({ name, value } = e.target as HTMLInputElement);
        setForm((prev) => ({ ...prev, [name!]: value }));
        break;
    }
  }

  function updateFoods() {
    const formatedResponse = {
      id: form.id,
      category: form.category,
      description: form.description,
      quantity: form.quantity.toString().replace(/[.,\s]/g, ""),
      used: form.used.toString().replace(/[.,\s]/g, ""),
      total: form.total.toString().replace(/(\d)(\d{2})$/, "$1.$2"),
      total_for_calc: form.total_for_calc
        .toString()
        .replace(/(\d)(\d{2})$/, "$1.$2"),
    };

    async function fetchData() {
      const status = await foodApi.put(form.id, formatedResponse);
      if (status === 200) {
        alert("Alimento atualizado com sucesso!");
        setIsModalOpen(false);
      } else {
        alert("Erro ao atualizar alimento!");
        setIsModalOpen(false);
      }
    }
    fetchData();
  }

  function deleteFoods() {
    async function fetchData() {
      const status = await foodApi.delete(form.id);
      if (status === 204) {
        alert("Alimento deletado com sucesso!");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        alert("Erro ao deletar alimento!");
        setIsModalOpen(false);
      }
    }
    fetchData();
  }

  const bodyTextClass = "w-full text-left";

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-8 flex items-center w-full gap-4 bg-[#ffffff] text-[#333333] rounded-md cursor-pointer hover:bg-[#f8eded]"
      >
        <p className={bodyTextClass}>{form.date}</p>
        <p className={bodyTextClass}>{form.category}</p>
        <p className={bodyTextClass}>{form.description}</p>
        <p className={bodyTextClass}>
          {formatToKilogram((form.quantity - form.used).toString())}
        </p>
        <p className={bodyTextClass + " text-red"}>
          - {formatToMoney(form.total.toString())}
        </p>
        <p className={bodyTextClass}>
          {formatToMoney(form.total_for_calc.toString())}
        </p>
      </div>
      {isModalOpen ? (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="bg-black w-screen h-screen fixed left-0 top-0 z-10 opacity-50"
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="px-16 py-32"
              noValidate
            >
              <TextField
                label={"categoria (simples e curtíssima)"}
                handleChange={(e) => handleChange(e, setForm)}
                value={form.category}
                name={"category"}
              />
              <TextField
                label={"descrição"}
                handleChange={(e) => handleChange(e, setForm)}
                value={form.description}
                name={"description"}
              />
              <TextField
                label={"quantidade original (kg/ml/un)"}
                handleChange={(e) => handleChange(e, setForm)}
                onKeyUp={(e) => handleKeyboardEvent(e, "kilogram")}
                onKeyDown={(e) => handleKeyboardEvent(e, "kilogram")}
                value={formatToKilogram(form.quantity.toString())}
                name={"quantity"}
              />
              <TextField
                label={"quantidade usada (kg/ml/un)"}
                handleChange={(e) => handleChange(e, setForm)}
                onKeyUp={(e) => handleKeyboardEvent(e, "kilogram")}
                onKeyDown={(e) => handleKeyboardEvent(e, "kilogram")}
                value={formatToKilogram(form.used.toString())}
                name={"used"}
              />
              <TextField
                label={"valor total"}
                handleChange={(e) => handleChange(e, setForm)}
                onKeyUp={(e) => handleKeyboardEvent(e, "money")}
                onKeyDown={(e) => handleKeyboardEvent(e, "money")}
                value={formatToMoney(form.total.toString())}
                name={"total"}
              />
              <TextField
                label={"total para cálculo (R$: 0,00)"}
                handleChange={(e) => handleChange(e, setForm)}
                onKeyUp={(e) => handleKeyboardEvent(e, "money")}
                onKeyDown={(e) => handleKeyboardEvent(e, "money")}
                value={formatToMoney(form.total_for_calc.toString())}
                name={"total_for_calc"}
              />
              <div className="flex gap-8 space-between w-full">
                <button
                  onClick={() => deleteFoods()}
                  className="px-8 py-4 bg-red text-white"
                >
                  Deletar
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gray-500 text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => updateFoods()}
                  className="px-8 py-4 bg-green-500 text-white"
                >
                  salvar
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
