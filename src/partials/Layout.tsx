import React, { Children } from "react";
import { NewItem } from "../components/NewItem";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-[#F4F4F4] pl-[335.75px] h-screen w-screen">
        <div className="w-full flex justify-end px-16 py-16">
          <NewItem />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
