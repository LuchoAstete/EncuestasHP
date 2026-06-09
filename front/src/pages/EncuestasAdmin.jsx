import { useEffect, useState } from "react";
import axios from "axios";

import BotonesAcciones from "../components/BotonesAcciones";
import EncuestaTable from "../components/EncuestaTable";
import ModalEncuesta from "../components/ModalEncuesta";
import ModalQR from "../components/ModalQR";

const API = import.meta.env.VITE_API_URL;

export default function EncuestasAdminPage() {
  const [encuestas, setEncuestas] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [mostrarQR, setMostrarQR] = useState(false);

  const [urlQR, setUrlQR] = useState("");

  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);

  const [catalogos, setCatalogos] = useState({
    encuestas: [],
    sucursales: [],
    origenes: [],
  });

  const [form, setForm] = useState({
    cdEncuesta: "",
    cdSucursal: "",
    cdOrigen: "",
    dtFechaDesde: "",
    dtFechaHasta: "",
    icActivo: true,
  });

  useEffect(() => {
    cargarEncuestas();
    cargarCatalogos();
  }, []);

  async function cargarEncuestas() {
    try {
      const response = await axios.get(`${API}/api/admin/encuestas`);

      setEncuestas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function cargarCatalogos() {
    try {
      const response = await axios.get(`${API}/api/admin/encuestas/catalogos`);
      console.log(response.data);
      setCatalogos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function guardarEncuesta() {
    try {
      await axios.post(`${API}/api/admin/encuestas`, form);

      setMostrarModal(false);

      cargarEncuestas();

      setForm({
        cdEncuesta: "",
        cdSucursal: "",
        cdOrigen: "",
        dtFechaDesde: "",
        dtFechaHasta: "",
        icActivo: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function abrirQR(item) {
    setEncuestaSeleccionada(item);

    setUrlQR(`https://encuesta.hpmedical.com.bo/${item.dsToken}`);

    setMostrarQR(true);
  }

  function copiar(url) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("URL copiada");
        })
        .catch(console.error);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = url;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

      alert("URL copiada");
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Administración de Encuestas</h1>

      <hr />

      <BotonesAcciones abrirNuevaEncuesta={() => setMostrarModal(true)} />

      <EncuestaTable encuestas={encuestas} copiar={copiar} abrirQR={abrirQR} />

      <ModalEncuesta
        mostrarModal={mostrarModal}
        cerrar={() => setMostrarModal(false)}
        form={form}
        setForm={setForm}
        catalogos={catalogos}
        guardarEncuesta={guardarEncuesta}
      />

      <ModalQR
        mostrarQR={mostrarQR}
        cerrar={() => setMostrarQR(false)}
        urlQR={urlQR}
        encuestaSeleccionada={encuestaSeleccionada}
      />
    </div>
  );
}
