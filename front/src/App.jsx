import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/index";
import EncuestaForm from "./pages/EncuestaForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pantalla principal para vendedores */}
        <Route path="/" element={<Index />} />

        {/* Encuestas por token (QR o URL directa) */}
        <Route path="/:token" element={<EncuestaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
