import React from "react";

type NewRecipeProps = {};

export function NewRecipe(props: NewRecipeProps) {
  return (
    <>
      <button className={"bg-[#27AE60] text-white px-8 py-4 rounded"}>+ Novo item</button>
    </>
  );
}
