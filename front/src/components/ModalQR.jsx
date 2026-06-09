import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRModal({ mostrarQR, encuestaSeleccionada, cerrar }) {
  const qrRef = useRef();

  if (!mostrarQR || !encuestaSeleccionada) return null;

  const url = `https://encuesta.hpmedical.com.bo/${encuestaSeleccionada.dsToken}`;

  function descargarQR() {
    const canvas = qrRef.current.querySelector("canvas");

    const link = document.createElement("a");

    const nombreArchivo =
      `${encuestaSeleccionada.dsEncuesta}_${encuestaSeleccionada.dsSucursal}`.replace(
        /\s+/g,
        "_"
      );

    link.download = `${nombreArchivo}.png`;

    link.href = canvas.toDataURL("image/png");

    link.click();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <h2>QR de la encuesta</h2>

        <div ref={qrRef}>
          <QRCodeCanvas value={url} size={250} />
        </div>

        <br />

        <div>{url}</div>

        <br />

        <button onClick={descargarQR}>Descargar QR</button>

        <button onClick={cerrar} style={{ marginLeft: 10 }}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
