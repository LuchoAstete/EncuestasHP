import { FaPlus } from "react-icons/fa";

export default function BotonesAcciones({ abrirNuevaEncuesta }) {
  return (
    <div className="acciones-header">
      <button className="btn-primary" onClick={abrirNuevaEncuesta}>
        <FaPlus />
        Nueva encuesta
      </button>
    </div>
  );
}
