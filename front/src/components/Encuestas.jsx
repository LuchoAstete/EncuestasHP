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
        `${API}/api/sucursales/sucursal/${cdSucursal}`
      );

      setEncuestas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function abrirEncuesta(token) {
    sessionStorage.setItem("origenEncuesta", "MANUAL");
    window.location.href = `/${token}`;
  }

  return (
    <div className="encuestas-container">
      <h2>Encuestas disponibles</h2>

      {encuestas.map((item) => (
        <button
          key={item.cdEncuesta}
          className="encuesta-button"
          onClick={() => abrirEncuesta(item.dsToken)}
        >
          {item.dsEncuesta}
        </button>
      ))}
    </div>
  );
}
