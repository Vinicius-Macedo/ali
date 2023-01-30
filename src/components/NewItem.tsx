// import React from "react";
// import { InputField } from "./InputField";

// type NewItemProps = {
//   category: string;
//   description: string;
//   quantity: number;
//   used: number;
//   total: number;
//   total_for_calc: number;
// };

// export function NewItem() {
//   const [form, setForm] = React.useState<NewItemProps>({
//     category: "",
//     description: "",
//     quantity: 0,
//     used: 0,
//     total: 0,
//     total_for_calc: 0,
//   });
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>, mask?: string) {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     console.log(form);
//   }

//   function formatToPointInTheThousand(
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) {
//     const { name, value } = e.currentTarget;
//     var valueFormatted = value.replace(/[^0-9]/g, "");

//     if (
//       valueFormatted === "" ||
//       valueFormatted.split("").every((char) => /^0$/.test(char)) ||
//       valueFormatted === "0000" ||
//       valueFormatted.length <= 3
//     ) {
//       valueFormatted = "0,000";
//     }

//     setForm((prev) => ({ ...prev, [name]: valueFormatted }));
//   }

//   function formatToPointInTheThousandKeyDown(
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) {
//     const { name, value } = e.currentTarget;
//     var valueFormatted = value.replace(/[^0-9]/g, "");

//     if (valueFormatted === "0000" && e.key === "Backspace") {
//       e.preventDefault();
//     } else if (valueFormatted[0] === "0" && e.key >= "0" && e.key <= "9") {
//       valueFormatted = value.slice(1);
//     } else if (e.key === "Backspace") {
//       valueFormatted = "0,000";
//     }

//     setForm((prev) => ({ ...prev, [name]: valueFormatted }));
//   }

//   function formatToMoney(e: React.KeyboardEvent<HTMLInputElement>) {
//     const { name, value } = e.currentTarget;
//     var valueFormatted = value.replace(/[^0-9]/g, "");

//     if (
//       valueFormatted === "" ||
//       valueFormatted === "00" ||
//       valueFormatted.length <= 2
//     ) {
//       valueFormatted = "000";
//     }

//     setForm((prev) => ({ ...prev, [name]: valueFormatted }));
//   }

//   function handleWithZeros(e: React.KeyboardEvent<HTMLInputElement>) {
//     const { name, value } = e.currentTarget;
//     var valueFormatted = value.replace(/[^0-9]/g, "");

//     if (valueFormatted === "000" && e.key === "Backspace") {
//       e.preventDefault();
//     } else if (valueFormatted[0] === "0" && e.key >= "0" && e.key <= "9") {
//       valueFormatted = value.slice(1);
//     } else if (e.key === "Backspace") {
//       valueFormatted = "000";
//     }

//     setForm((prev) => ({ ...prev, [name]: valueFormatted }));
//   }

//   function formatToMoneyValue(value: string) {
//     if (value === "") {
//       value = "0,00";
//     } else {
//       value = value
//         .replace(/\D/g, "")
//         .replace(/(\d)(\d{2})$/, "$1,$2")
//         .replace(/(?=(\d{3})+(\D))\B/g, ".");
//     }
//     return value;
//   }

//   function formatToKilogramValue(value: string) {
//     if (value === "" || value === "0") {
//       value = "0,000";
//     } else if (value.length <= 3) {
//       while (value.length < 4) {
//         value = "0" + value;
//       }
//       value = value
//         .replace(/\D/g, "")
//         .replace(/(\d)(\d{3})$/, "$1,$2")
//         .replace(/(?=(\d{3})+(\D))\B/g, ".");
//     } else {
//       value = value
//         .replace(/\D/g, "")
//         .replace(/(\d)(\d{3})$/, "$1,$2")
//         .replace(/(?=(\d{3})+(\D))\B/g, ".");
//     }
//     return value;
//   }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//   }

//   function createFoods() {
//     // check if the fields are empty
//     if (
//       form.category === "" ||
//       form.description === ""
//       // form.quantity === 0 ||
//       // form.used === 0 ||
//       // form.total === 0 ||
//       // form.total_for_calc === 0
//     ) {
//       alert("Preencha todos os campos!");
//       return;
//     }

//     const formatedResponse = {
//       category: form.category,
//       description: form.description,
//       quantity: form.quantity.toString().replace(/[.,\s]/g, ""),
//       used: form.used.toString().replace(/[.,\s]/g, ""),
//       total: form.total,
//       total_for_calc: form.total_for_calc.toString(),
//     };

//     async function fetchData() {
//       const response = await fetch(`http://127.0.0.1:8000/api/food/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formatedResponse),
//       });

//       console.log(formatedResponse);

//       if (response.status === 201) {
//         alert("Alimento atualizado com sucesso!");
//         setIsModalOpen(false);
//       } else {
//         alert("Erro ao atualizar alimento!");
//       }
//     }
//     fetchData();
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className={"bg-[#27AE60] text-white px-8 py-4 rounded"}
//       >
//         + Novo item
//       </button>
//       {isModalOpen ? (
//         <>
//           <div
//             onClick={() => setIsModalOpen(false)}
//             className="bg-black w-screen h-screen fixed left-0 top-0 z-10 opacity-50"
//           ></div>
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20">
//             <form
//               onSubmit={(e) => handleSubmit(e)}
//               className="px-16 py-32"
//               noValidate
//             >
//               <InputField
//                 label={"categoria"}
//                 handleChange={(e) => handleChange(e)}
//                 value={form.category}
//                 name={"category"}
//               />
//               <InputField
//                 label={"descrição"}
//                 handleChange={(e) => handleChange(e)}
//                 value={form.description}
//                 name={"description"}
//               />
//               <InputField
//                 label={"quantidade at. (kg/ml)"}
//                 handleChange={(e) => handleChange(e)}
//                 onKeyUp={(e) => formatToPointInTheThousand(e)}
//                 onKeyDown={(e) => formatToPointInTheThousandKeyDown(e)}
//                 value={formatToKilogramValue(form.quantity.toString())}
//                 name={"quantity"}
//               />
//               <InputField
//                 label={"quantidade usada (kg/ml)"}
//                 handleChange={(e) => handleChange(e)}
//                 onKeyUp={(e) => formatToPointInTheThousand(e)}
//                 onKeyDown={(e) => formatToPointInTheThousandKeyDown(e)}
//                 value={formatToKilogramValue(form.used.toString())}
//                 name={"used"}
//               />
//               <InputField
//                 label={"valor total"}
//                 handleChange={(e) => handleChange(e)}
//                 onKeyUp={(e) => formatToMoney(e)}
//                 onKeyDown={(e) => handleWithZeros(e)}
//                 value={formatToMoneyValue(form.total.toString())}
//                 name={"total"}
//               />
//               <InputField
//                 label={"total para cálculo (R$: 0,00)"}
//                 handleChange={(e) => handleChange(e)}
//                 onKeyUp={(e) => formatToMoney(e)}
//                 onKeyDown={(e) => handleWithZeros(e)}
//                 value={formatToMoneyValue(form.total_for_calc.toString())}
//                 name={"total_for_calc"}
//               />
//               <div className="flex gap-8 space-between w-full">
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="px-8 py-4 bg-gray-500 text-white"
//                 >
//                   Cancelar
//                 </button>
//                 <button
//                   onClick={() => createFoods()}
//                   className="px-8 py-4 bg-green-500 text-white"
//                 >
//                   Criar
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

import React from "react";
import { InputField } from "./InputField";

type NewItemProps = {
  // id: number;
  // date: string;
  category: string;
  description: string;
  quantity: number;
  used: number;
  total: number;
  total_for_calc: number;
};

export function NewItem(props: NewItemProps) {
  const [form, setForm] = React.useState<NewItemProps>(props);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, mask?: string) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function formatToPointInTheThousand(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    const { name, value } = e.currentTarget;
    var valueFormatted = value.replace(/[^0-9]/g, "");

    if (
      valueFormatted === "" ||
      valueFormatted.split("").every((char) => /^0$/.test(char)) ||
      valueFormatted === "0000" ||
      valueFormatted.length <= 3
    ) {
      valueFormatted = "0,000";
    }

    setForm((prev) => ({ ...prev, [name]: valueFormatted }));
  }

  function formatToPointInTheThousandKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    const { name, value } = e.currentTarget;
    var valueFormatted = value.replace(/[^0-9]/g, "");

    if (valueFormatted === "0000" && e.key === "Backspace") {
      e.preventDefault();
    } else if (valueFormatted[0] === "0" && e.key >= "0" && e.key <= "9") {
      valueFormatted = value.slice(1);
    } else if (e.key === "Backspace") {
      valueFormatted = "0,000";
    }

    setForm((prev) => ({ ...prev, [name]: valueFormatted }));
  }

  function formatToMoney(e: React.KeyboardEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    var valueFormatted = value.replace(/[^0-9]/g, "");

    if (
      valueFormatted === "" ||
      valueFormatted === "00" ||
      valueFormatted.length <= 2
    ) {
      valueFormatted = "000";
    }

    setForm((prev) => ({ ...prev, [name]: valueFormatted }));
  }

  function handleWithZeros(e: React.KeyboardEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    var valueFormatted = value.replace(/[^0-9]/g, "");

    if (valueFormatted === "000" && e.key === "Backspace") {
      e.preventDefault();
    } else if (valueFormatted[0] === "0" && e.key >= "0" && e.key <= "9") {
      valueFormatted = value.slice(1);
    } else if (e.key === "Backspace") {
      valueFormatted = "000";
    }

    setForm((prev) => ({ ...prev, [name]: valueFormatted }));
  }

  function formatToMoneyValue(value: string) {
    if (value === "") {
      value = "0,00";
    } else {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");
    }
    return value;
  }

  function formatToKilogramValue(value: string) {
    if (value === "" || value === "0") {
      value = "0,000";
    } else if (value.length <= 3) {
      while (value.length < 4) {
        value = "0" + value;
      }
      value = value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{3})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");
    } else {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d)(\d{3})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".");
    }
    return value;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function updateFoods() {
    const formatedResponse = {
      category: form.category,
      description: form.description,
      quantity: form.quantity.toString().replace(/[.,\s]/g, ""),
      used: form.used.toString().replace(/[.,\s]/g, ""),
      total: form.total,
      total_for_calc: form.total_for_calc.toString(),
    };

    async function fetchData() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/food/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatedResponse),
        }
      );

      console.log(formatedResponse);

      if (response.status === 200) {
        alert("Alimento atualizado com sucesso!");
        setIsModalOpen(false);
      } else {
        alert("Erro ao atualizar alimento!");
      }
    }
    fetchData();
  }

  function deleteFoods() {
    async function fetchData() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/food/${props.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 204) {
        alert("Alimento deletado com sucesso!");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        alert("Erro ao atualizar alimento!");
      }
    }
    fetchData();
  }

  const bodyTextClass = "w-full text-left";

  return (
    <>
      <button>teste</button>
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
              <InputField
                label={"categoria"}
                handleChange={(e) => handleChange(e)}
                value={form.category}
                name={"category"}
              />
              <InputField
                label={"descrição"}
                handleChange={(e) => handleChange(e)}
                value={form.description}
                name={"description"}
              />
              <InputField
                label={"quantidade at. (kg/ml)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => formatToPointInTheThousand(e)}
                onKeyDown={(e) => formatToPointInTheThousandKeyDown(e)}
                value={formatToKilogramValue(form.quantity.toString())}
                name={"quantity"}
              />
              <InputField
                label={"quantidade usada (kg/ml)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => formatToPointInTheThousand(e)}
                onKeyDown={(e) => formatToPointInTheThousandKeyDown(e)}
                value={formatToKilogramValue(form.used.toString())}
                name={"used"}
              />
              <InputField
                label={"valor total"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => formatToMoney(e)}
                onKeyDown={(e) => handleWithZeros(e)}
                value={formatToMoneyValue(form.total.toString())}
                name={"total"}
              />
              <InputField
                label={"total para cálculo (R$: 0,00)"}
                handleChange={(e) => handleChange(e)}
                onKeyUp={(e) => formatToMoney(e)}
                onKeyDown={(e) => handleWithZeros(e)}
                value={formatToMoneyValue(form.total_for_calc.toString())}
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
