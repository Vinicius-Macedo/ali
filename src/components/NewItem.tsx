import React from "react";
import { TextField } from "./TextField";
import {
  maskToKilogram,
  formatToKilogram,
  maskToMoney,
  formatToMoney,
} from "../utils/formatValues";
import { GenericApi } from "../utils/genericApi";

type FormProps = {
  date: string;
  category: string;
  description: string;
  quantity: number;
  used: number;
  total: number;
  total_for_calc: number;
};

export function NewItem() {
  const [form, setForm] = React.useState<FormProps>({
    date: "",
    category: "",
    description: "",
    quantity: 0,
    used: 0,
    total: 0,
    total_for_calc: 0,
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let foodApi = new GenericApi( "api/food");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function createFood() {
    const formatedResponse = {
      category: form.category,
      description: form.description,
      quantity: form.quantity.toString().replace(/[.,\s]/g, ""),
      used: form.used.toString().replace(/[.,\s]/g, ""),
      total: form.total.toString().replace(/(\d{2})$/, ".$1"),
      total_for_calc: form.total_for_calc.toString().replace(/(\d{2})$/, ".$1"),
    };

    async function fetchData() {
      const status = await foodApi.post(formatedResponse);

      if (status === 201) {
        alert("Alimento criado com sucesso!");
        setIsModalOpen(false);
        setForm({
          date: "",
          category: "",
          description: "",
          quantity: 0,
          used: 0,
          total: 0,
          total_for_calc: 0,
        });
        window.location.reload();
      } else {
        alert("Erro ao criar alimento!");
      }
    }
    fetchData();
  }

  return (
    <>
      <button
        className="p-10 py-4 rounded bg-[#27AE60] text-white"
        onClick={() => setIsModalOpen(true)}
      >
        + Novo item
      </button>
      {isModalOpen ? (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="bg-black w-screen h-screen fixed left-0 top-0 z-10 opacity-50"
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="px-16 py-32"
              noValidate
            >
              <TextField
                label={"categoria (simples e curto)"}
                handleChange={(e) => handleChange(e)}
                value={form.category}
                name={"category"}
              />
              <TextField
                label={"descrição"}
                handleChange={(e) => handleChange(e)}
                value={form.description}
                name={"description"}
              />
              <TextField
                label={"quantidade at. (kg/ml)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => handleKeyboardEvent(e, "kilogram")}
                onKeyDown={(e) => handleKeyboardEvent(e, "kilogram")}
                value={formatToKilogram(form.quantity.toString())}
                name={"quantity"}
              />
              <TextField
                label={"quantidade usada (kg/ml)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => handleKeyboardEvent(e, "kilogram")}
                onKeyDown={(e) => handleKeyboardEvent(e, "kilogram")}
                value={formatToKilogram(form.used.toString())}
                name={"used"}
              />
              <TextField
                label={"valor total"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => handleKeyboardEvent(e, "money")}
                onKeyDown={(e) => handleKeyboardEvent(e, "money")}
                value={formatToMoney(form.total.toString())}
                name={"total"}
              />
              <TextField
                label={"total para cálculo (R$: 0,00)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => handleKeyboardEvent(e, "money")}
                onKeyDown={(e) => handleKeyboardEvent(e, "money")}
                value={formatToMoney(form.total_for_calc.toString())}
                name={"total_for_calc"}
              />
              <div className="flex gap-8 space-between w-full">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gray-500 text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => createFood()}
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
