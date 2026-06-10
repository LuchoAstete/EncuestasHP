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
    <div className="modal-overlay">
      <div className="qr-modal">
        <h2 className="modal-title"></h2>

        <div className="qr-container">
          <div ref={qrRef}>
            <QRCodeCanvas value={url} size={250} />
          </div>
        </div>

        <div className="qr-url">{url}</div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={cerrar}>
            Cerrar
          </button>

          <button className="btn-primary" onClick={descargarQR}>
            Descargar QR
          </button>
        </div>
      </div>
    </div>
  );
}
