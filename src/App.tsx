import "./scss/main.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CriarConta } from "./pages/CriarConta";
import { MinhaConta } from "./pages/MinhaConta";
import { Alimentos } from "./pages/Alimentos";
import { Pratos } from "./pages/Pratos";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/registro" element={<CriarConta />} /> */}
        {/* <Route path="/minha-conta" element={<MinhaConta />} /> */}
        <Route path="/" element={<Alimentos />} />
        <Route path="/alimentos" element={<Alimentos />} />
        <Route path="/pratos" element={<Pratos />} />
        <Route path="/caixa" element={<Pratos />} />
      </Routes>
    </>
  );
}

export default App;
