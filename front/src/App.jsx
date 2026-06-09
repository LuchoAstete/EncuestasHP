import { BrowserRouter, Routes, Route } from "react-router-dom";

import EncuestaForm from "./pages/EncuestaForm";
import EncuestasAdmin from "./pages/EncuestasAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel administrativo */}
        <Route path="/admin" element={<EncuestasAdmin />} />

        {/* Encuestas por token */}
        <Route path="/:token" element={<EncuestaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
