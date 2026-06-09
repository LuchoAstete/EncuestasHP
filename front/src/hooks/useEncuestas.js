import { useEffect, useState } from "react";
import {
  obtenerEncuestas,
  obtenerCatalogos
} from "../services/encuestasService";

export default function useEncuestas() {
  const [encuestas, setEncuestas] = useState([]);
  const [encuestasCatalogo, setEncuestasCatalogo] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [origenes, setOrigenes] = useState([]);

  useEffect(() => {
    cargarTodo();
  }, []);

  async function cargarTodo() {
    await cargarEncuestas();
    await cargarCatalogos();
  }

  async function cargarEncuestas() {
    const response = await obtenerEncuestas();

    setEncuestas(response.data);
  }

  async function cargarCatalogos() {
    const response = await obtenerCatalogos();

    setEncuestasCatalogo(response.data.encuestas);
    setSucursales(response.data.sucursales);
    setOrigenes(response.data.origenes);
  }

  return {
    encuestas,
    encuestasCatalogo,
    sucursales,
    origenes,
    cargarEncuestas
  };
}