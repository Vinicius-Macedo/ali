import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Layout } from "../partials/Layout";
import { GenericApi } from "../utils/genericApi";

export function Pratos() {
  const [recipeData, setRecipeData] = useState<any>(null);
  const [foodData, setFoodData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      let api = new GenericApi("api/recipe");
      const data = await api.getAll();
      setRecipeData(data);
    }
    async function fetchFoodData() {
      let api = new GenericApi("api/food");
      const data = await api.getAll();
      setFoodData(data);
    }
    fetchFoodData();
    fetchData();
  }, []);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8">
        {recipeData.map((item: any) => (
          <RecipeCard
            key={item.id}
            id={item.id}
            recipe={item.recipe}
            description={item.description}
            foodData={foodData}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </Layout>
  );
}
