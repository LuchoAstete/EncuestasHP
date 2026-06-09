import EncuestaRow from "./EncuestaRow";

export default function EncuestaTable({
  encuestas,
  copiar,
  abrirQR,
  //editarEncuesta,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Sucursal</th>
          <th>Encuesta</th>
          <th>Origen</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Activa</th>
          <th>URL</th>
          <th>QR</th>
        </tr>
      </thead>

      <tbody>
        {encuestas.map((item) => (
          <EncuestaRow
            key={item.cdEncuestaSucursal}
            item={item}
            copiar={copiar}
            abrirQR={abrirQR}
            //editarEncuesta={editarEncuesta}
          />
        ))}
      </tbody>
    </table>
  );
}
