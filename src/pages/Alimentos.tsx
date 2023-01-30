import { useEffect, useState } from "react";
import { RowFoods } from "../components/RowFoods";
import { Layout } from "../partials/Layout";

export function Alimentos() {
  const [foodData, setFoodData] = useState<any>(null);
  const headTextClass = "break-words w-full text-left text-[#4F4F4F] font-bold";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/food/");
      const json = await response.json();
      console.log(json);
      setFoodData(json);
    }
    fetchData();
  }, []);

  if (!foodData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="px-16 flex flex-col gap-8">
        <div className="flex w-full px-8 gap-4">
          <p className={headTextClass}>Data</p>
          <p className={headTextClass}>Categoria</p>
          <p className={headTextClass}>Descrição</p>
          <p className={headTextClass}>Quantidade at. kg/ml</p>
          <p className={headTextClass}>Valor Total</p>
          <p className={headTextClass}>Valor p/ Calc.</p>
          {/* <p className={headTextClass}>Valor Unit.</p> */}
        </div>
        <div className="flex flex-col gap-6">
          {foodData.map((item: any) => (
            <RowFoods
              key={item.id}
              id={item.id}
              category={item.category}
              description={item.description}
              quantity={item.quantity}
              total={item.total}
              total_for_calc={item.total_for_calc}
              date={item.updated_at}
              used={item.used}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
