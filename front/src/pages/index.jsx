import { useState } from "react";
import Sucursales from "../components/Sucursales";
import Encuestas from "../components/Encuestas";
import "../styles/admin.css";

export default function Index() {
  const [cdSucursal, setCdSucursal] = useState(null);

  return (
    <div className="home-container">
      <div className="home-card">
        <img src="/HP.png" className="home-logo" alt="HP Medical" />

        <p>Seleccione la sucursal y luego la encuesta correspondiente.</p>

        <Sucursales sucursal={cdSucursal} setSucursal={setCdSucursal} />

        {cdSucursal && <Encuestas cdSucursal={cdSucursal} />}
      </div>
    </div>
  );
}
