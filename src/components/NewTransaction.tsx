import React from "react";

type TransactionProps = {};

export function Transaction(props: TransactionProps) {
  return (
    <>
      <button className={"bg-[#27AE60] text-white px-8 py-4 rounded"}>+ Novo item</button>
    </>
  );
}
