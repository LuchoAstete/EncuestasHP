import { FaCopy, FaQrcode, FaEdit } from "react-icons/fa";

export default function EncuestaRow({ item, copiar, abrirQR, editarEncuesta }) {
  const url = `https://encuesta.hpmedical.com.bo/${item.dsToken}`;

  return (
    <tr>
      <td>{item.cdEncuestaSucursal}</td>

      <td>{item.dsSucursal}</td>

      <td>{item.dsEncuesta}</td>

      <td>{item.dsOrigen}</td>

      <td>{item.dtFechaDesde.substring(0, 10)}</td>

      <td>{item.dtFechaHasta.substring(0, 10)}</td>

      <td>{item.icActivo ? "Sí" : "No"}</td>

      <td>
        <button onClick={() => copiar(url)}>
          <FaCopy />
        </button>
      </td>

      <td>
        <button onClick={() => abrirQR(item)}>
          <FaQrcode />
        </button>
      </td>

      {/*<td>
        <button onClick={() => editarEncuesta(item)}>
          <FaEdit />
        </button>
      </td>*/}
    </tr>
  );
}
