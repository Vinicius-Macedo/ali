import { useEffect, useState } from "react";
import {
  formatToKilogram,
  formatToMoney,
  handleChange,
  handleKeyboardEvent,
} from "../utils/formatValues";
import { OptionField } from "./OptionField";
import { TextField } from "./TextField";
import { GenericApi } from "../utils/genericApi";
import { HiTrash } from "react-icons/hi";

type RecipeCardProps = {
  id: number;
  recipe: string;
  description: string;
  foodData: any;
  ingredients: any;
};

type SelectedFoodInformation = {
  name: string;
  quantity: number;
};

type Ingrediente = {
  id: number;
  category: string;
  description: string;
  quantity: number;
  used: number;
  total: string;
  total_for_calc: number;
  created_at: string;
  updated_at: string;
};

type Receita = {
  id: number;
  name: string;
  quantity: number;
  gasto_atual: any;
  created_at: string;
  updated_at: string;
  ingredientes: Ingrediente[];
};

type Receitas = Receita[];

export default function RecipeCard(props: RecipeCardProps) {
  const [form, setForm] = useState<RecipeCardProps>(props);
  const [newIngredientFood, setNewIngredientFood] =
    useState<SelectedFoodInformation>({
      name: "",
      quantity: 0,
    });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>("");

  const [foodForRecipe, setFoodForRecipe] = useState<any>([]);
  const [foodWithPrice, setFoodWithPrice] = useState<any>([]);
  const [promisesResolved, setPromisesResolved] = useState(false);
  const [promisesResolved2, setPromisesResolved2] = useState(false);

  const [foodsWithRecipe, setFoodsWithRecipe] = useState<any>([]);

  useEffect(() => {
    Promise.all(
      props.ingredients.map((item: any) => getByCategory(item.name))
    ).then((results) => {
      const mergedResults = results.reduce((accumulator, currentArray) =>
        accumulator.concat(currentArray)
      );

      if (checkAvailability(mergedResults, props.ingredients)) {
        setPromisesResolved(true);
      } else {
        setErrorMessage("Falta alimentos para essa receita");
      }
    });
  }, []);

  useEffect(() => {
    if (promisesResolved) {
      setFoodsWithRecipe(
        unifyRecipeWithFoods(props.ingredients, foodForRecipe)
      );
      setPromisesResolved2(true);
    }

    setPromisesResolved(false);
  }, [promisesResolved]);

  useEffect(() => {
    if (promisesResolved2) {
      setFoodWithPrice(adicionarGastoAtual(foodsWithRecipe));
    }

    setPromisesResolved2(false);
  }, [promisesResolved2]);

  let recipeApi = new GenericApi("api/recipe");
  let ingredientApi = new GenericApi("api/ingredient");
  let foodApi = new GenericApi("api/food");

  function deleteRecipe() {
    async function deleteData() {
      const status = await recipeApi.delete(props.id);
      if (status === 204) {
        alert("Receita deletada com sucesso!");
      } else {
        alert("Erro ao deletar receita!");
      }
    }
    deleteData();
    window.location.reload();
  }

  function somarGastos(array: any) {
    let totalGastos = 0;
    for (let i = 0; i < array.length; i++) {
      totalGastos += array[i].gasto_atual;
    }
    return totalGastos;
  }

  function updateRecipe() {
    async function update() {
      const status = await recipeApi.put(props.id, form);
      if (status === 200) {
        alert("Receita atualizada com sucesso!");
      } else {
        alert("Erro ao atualizar receita!");
      }
    }
    update();
    window.location.reload();
  }

  function addIngredient(recipeId: number, ingredient: any) {
    async function add() {
      const status = await recipeApi.attachIngredientToRecipe(
        recipeId,
        ingredient
      );
      if (status === 201) {
        alert("Ingrediente adicionado com sucesso!");
        window.location.reload();
      } else {
        alert("Erro ao adicionar ingrediente!");
      }
    }
    add();
  }

  function getByCategory(param: string) {
    async function fetch() {
      return await foodApi.filterByParam("category", param);
    }
    return fetch();
  }

  function deleteIngredient(ingredientId: any) {
    async function deleteItem() {
      const status = await ingredientApi.delete(ingredientId);
      if (status === 204) {
        alert("Ingrediente deletado com sucesso!");
        window.location.reload();
      } else {
        alert("Erro ao deletar ingrediente!");
      }
    }
    deleteItem();
  }

  function checkAvailability(food: any, ingredient: any) {
    const missingIngredients: string[] = [];
    let newFoodForRecipe: any = []; // Create a new array to store the updated foodForRecipe

    for (let i = 0; i < ingredient.length; i++) {
      const foods = food.filter(
        (item: any) => item.category === ingredient[i].name
      );

      if (foods.length === 0) {
        missingIngredients.push(ingredient[i].name);
        alert("parece estar faltando:" + missingIngredients);
      } else {
        newFoodForRecipe = [...newFoodForRecipe, ...foods]; // Add the new foods to the existing foodForRecipe array
      }
    }

    setFoodForRecipe(newFoodForRecipe); // Update the state with the new array

    if (missingIngredients.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function unifyRecipeWithFoods(receita: any, ingredientes: any) {
    const receitasIngredientes = receita.map((receitaItem: any) => {
      const ingredientesDaCategoria = ingredientes.filter(
        (ingrediente: any) => receitaItem.name === ingrediente.category
      );
      return { ...receitaItem, ingredientes: ingredientesDaCategoria };
    });
    return receitasIngredientes;
  }

  function adicionarGastoAtual(arrayReceitas: any[]) {
    let newArray: any = [];
    for (let i = 0; i < arrayReceitas.length; i++) {
      let itemActual = arrayReceitas[i];
      var gastoAtual = calcularPrecoIngredientes(itemActual);
      itemActual.gasto_atual = gastoAtual;
      newArray.push(itemActual);
    }
    console.log(newArray);
    return newArray;
  }

  function calcularPrecoIngredientes(receita: Receita) {
    let precoTotal = 0;
    let quantidadeNecessaria = receita.quantity;

    const ingredientesOrdenados = receita.ingredientes.sort(
      (a, b) =>
        new Date(parseDateFromString(a.created_at)).getTime() -
        new Date(parseDateFromString(b.created_at)).getTime()
    );

    for (let i = 0; i < ingredientesOrdenados.length; i++) {
      const ingrediente = ingredientesOrdenados[i];
      const quantidadeDisponivel = ingrediente.quantity - ingrediente.used;

      if (quantidadeDisponivel >= quantidadeNecessaria) {
        precoTotal +=
          quantidadeNecessaria *
          (ingrediente.total_for_calc / quantidadeDisponivel);

        break;
      } else {
        precoTotal +=
          quantidadeDisponivel *
          (ingrediente.total_for_calc / quantidadeDisponivel);
        quantidadeNecessaria -= quantidadeDisponivel;
      }
    }

    return precoTotal;
  }

  function parseDateFromString(dateString: string) {
    const [date, time] = dateString.split(" ");
    const [day, month, year] = date.split("-");
    const [hour, minute, second] = time.split(":");
    return `${month}-${day}-${year} ${hour}:${minute}:${second}`;
  }

  return (
    <>
      <div className="bg-white p-8 rounded flex flex-col gap-32">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-[18px] text-center">{props.recipe}</h2>
          <p className="text-center">{props.description}</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => setIsIngredientsModalOpen(true)}
            className="py-4 px-8 bg-green-500 hover:bg-green-700 text-white w-[171px] rounded"
          >
            Editar Ingredientes
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-4 px-8 bg-gray-100 hover:bg-gray-300 w-[171px] text-black rounded"
          >
            Editar Receita
          </button>
        </div>
      </div>

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
                  onClick={() => deleteRecipe()}
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
                  onClick={() => updateRecipe()}
                  className="px-8 py-4 bg-green-500 text-white"
                >
                  salvar
                </button>
              </div>
            </form>
            <div></div>
          </div>
        </>
      ) : (
        ""
      )}
      {isIngredientsModalOpen ? (
        <>
          <div
            onClick={() => setIsIngredientsModalOpen(false)}
            className="bg-black w-screen h-screen fixed left-0 top-0 z-10 opacity-50"
          ></div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20  rounded flex">
            <div className="flex flex-col-reverse">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="px-16 py-16"
                noValidate
              >
                <OptionField
                  label={"ingredientes"}
                  name={"name"}
                  avaibleOptions={props.foodData}
                  usedOptions={props.ingredients}
                  handleChange={(e) => handleChange(e, setNewIngredientFood)}
                />
                <TextField
                  label={"quantidade g/ml"}
                  name={"quantity"}
                  handleChange={(e) => handleChange(e, setNewIngredientFood)}
                  onKeyUp={(e) => handleKeyboardEvent(e, setForm, "kilogram")}
                  onKeyDown={(e) => handleKeyboardEvent(e, setForm, "kilogram")}
                  value={formatToKilogram(
                    newIngredientFood.quantity.toString()
                  )}
                />
                <div className="flex gap-8 space-between w-full">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-gray-500 text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() =>
                      addIngredient(props.id, {
                        name: newIngredientFood.name,
                        quantity: newIngredientFood.quantity
                          .toString()
                          .replace(/[^\d]/g, ""),
                      })
                    }
                    className="px-8 py-4 bg-green-500 text-white"
                  >
                    adicionar ingrediente
                  </button>
                </div>
              </form>
              {props.ingredients.length > 0 ? (
                <>
                  <div className="p-16 pb-0 flex flex-col gap-2">
                    {props.ingredients.map((ingredient: any) => (
                      <div
                        key={ingredient.id}
                        className="flex gap-4 justify-between w-full"
                      >
                        <p className="dotted-after">{ingredient.name}</p>
                        <p className="flex gap-4 items-center">
                          {formatToKilogram(ingredient.quantity.toString())}{" "}
                          <span>ml/g</span>
                          <HiTrash
                            className="cursor-pointer"
                            color="#EB5757"
                            onClick={() => deleteIngredient(ingredient.id)}
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="p-16 pb-0">
                <p className="text-red">{errorMessage}</p>
                {foodForRecipe ? (
                  <>
                    {foodForRecipe.map((item: any) => (
                      <div className="grid grid-cols-4 gap-16" key={item.id}>
                        <p>{item.category}</p>
                        <p>{item.description}</p>
                        <p>
                          {formatToKilogram(
                            (item.quantity - item.used).toString()
                          )}
                          <span className="text-[12px] font-bold">
                            kg/ml/un
                          </span>
                        </p>
                        <p>{item.total_for_calc}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  "Carregando... (Não pode haver erros)"
                )}
              </div>
            </div>
            <div className="p-16 w-[310px]">
              {foodWithPrice ? (
                <>
                  {foodWithPrice.map((item: any) => (
                    <div className="flex " key={item.id}>
                      <p className="dotted-after">
                        {item.name +
                          "(" +
                          formatToKilogram(item.quantity.toString()) +
                          ")"}
                      </p>
                      <p className="whitespace-nowrap">
                        {" "}
                        R$ {item.gasto_atual.toString()}
                      </p>
                    </div>
                  ))}
                  <div>
                    <br />
                  </div>
                  <div className="flex">
                    <p className="dotted-after">total:</p>
                    <p>{somarGastos(foodWithPrice)}</p>
                  </div>
                </>
              ) : (
                "false"
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
