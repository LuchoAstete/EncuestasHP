import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Encuestas({ cdSucursal }) {
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    if (cdSucursal) {
      cargarEncuestas();
    } else {
      setEncuestas([]);
    }
  }, [cdSucursal]);

  async function cargarEncuestas() {
    try {
      const response = await axios.get(
        `${API}/api/sucursales/${cdSucursal}/encuestas`
      );

      setEncuestas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function abrirEncuesta(cdEncuestaSucursal) {
    sessionStorage.setItem("origenEncuesta", "2");
    sessionStorage.setItem("cdEncuestaSucursal", cdEncuestaSucursal);
    window.location.href = `/${cdEncuestaSucursal}`;
  }

  return (
    <div className="encuestas-container">
      <h2>Encuestas disponibles</h2>

      {encuestas.length === 0 ? (
        <p className="sin-encuestas">
          No hay encuestas vigentes para esta sucursal.
        </p>
      ) : (
        encuestas.map((item) => (
          <button
            key={item.cdEncuesta}
            className="encuesta-button"
            onClick={() => abrirEncuesta(item.cdEncuestaSucursal)}
          >
            {item.dsEncuesta}
          </button>
        ))
      )}
    </div>
  );
}
