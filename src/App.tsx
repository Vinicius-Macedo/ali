import "./scss/main.scss";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CriarConta } from "./pages/CriarConta";
import { MinhaConta } from "./pages/MinhaConta";
import { Alimentos } from "./pages/Alimentos";



function App() {

  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<CriarConta />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/alimentos" element={<Alimentos />} />
      </Routes>
    </>
  );
}

export default App;
