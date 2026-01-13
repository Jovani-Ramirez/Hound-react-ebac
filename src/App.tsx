import { Routes, Route } from "react-router-dom";

import type { JSX } from "react";
import { Estado } from "./pages/Estado";
import { Lista } from "./pages/Lista";
import { Buscar } from "./pages/Buscar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Registro from "./pages/Registro";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/estado" element={<Estado />} />
        <Route path="/lista" element={<Lista />} />
        <Route path="/buscar" element={<Buscar />} />
      </Route>
    </Routes>
  );
}
