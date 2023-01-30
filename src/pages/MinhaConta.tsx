import React from "react";

export function MinhaConta() {
  return (
    <>
      <section className="bg-dark w-screen h-screen relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-24 py-32 rounded w-full max-w-[400px]">
          <h1 className="text-white text-[36px]">Nome</h1>
          <h1 className="text-white text-[36px]">Email</h1>
          <h1 className="text-white text-[36px]">Senha</h1>
        </div>
      </section>
    </>
  );
}
