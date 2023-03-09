import React from "react";
import { TextField } from "./TextField";
import { GenericApi } from "../utils/genericApi";
import { handleChange } from "../utils/formatValues";

type FormProps = {
  recipe: string;
  description: string;
};

export function NewRecipe() {
  const [form, setForm] = React.useState<FormProps>({
    recipe: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let recipeApi = new GenericApi( "api/recipe");

  function createRecipe() {
    async function callApi() {
      const status = await recipeApi.post(form);
      if (status === 201) {
        alert("Receita criada com sucesso!");
        setIsModalOpen(false);
        setForm({ recipe: "", description: "" });
        window.location.reload();
      } else {
        setForm({ recipe: "", description: "" });
        setIsModalOpen(false);
      }
    }
    callApi();
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={"bg-[#fff] px-8 py-4 rounded"}
      >
        + Novo Prato
      </button>
      {isModalOpen ? (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="bg-black w-screen h-screen fixed left-0 top-0 z-10 opacity-50"
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 flex gap-16 rounded">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="px-16 py-16"
              noValidate
            >
              <TextField
                label={"Nome da receita"}
                handleChange={(e) => handleChange(e, setForm)}
                value={form.recipe}
                name={"recipe"}
              />
              <TextField
                label={"descrição"}
                handleChange={(e) => handleChange(e, setForm)}
                value={form.description}
                name={"description"}
              />
              <div className="flex gap-8 space-between w-full">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gray-500 text-white"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => createRecipe()}
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
