import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const obtenerEncuestas = () =>
  axios.get(`${API}/api/admin/encuestas`);

export const obtenerCatalogos = () =>
  axios.get(`${API}/api/admin/encuestas/catalogos`);

export const crearEncuesta = (data) =>
  axios.post(`${API}/api/admin/encuestas`, data);

export const actualizarEncuesta = (id, data) =>
  axios.put(`${API}/api/admin/encuestas/${id}`, data);