import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const API = import.meta.env.VITE_API_URL;

export default function Sucursales({ sucursal, setSucursal }) {
  const [lista, setLista] = useState([]);
  const opciones = lista.map((item) => ({
    value: item.cdSucursal,
    label: item.dsSucursal,
  }));

  useEffect(() => {
    cargarSucursales();
  }, []);

  async function cargarSucursales() {
    try {
      const response = await axios.get(`${API}/api/sucursales`);

      setLista(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="selector-container">
      <label className="selector-label">Selecciona una sucursal</label>

      <Select
        options={opciones}
        placeholder="Seleccione una sucursal"
        value={opciones.find((o) => o.value === sucursal)}
        onChange={(opcion) => setSucursal(opcion ? opcion.value : null)}
        isSearchable
      />
    </div>
  );
}
