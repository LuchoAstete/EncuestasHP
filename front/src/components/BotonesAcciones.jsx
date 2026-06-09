import { FaPlus } from "react-icons/fa";

export default function BotonesAcciones({ abrirNuevaEncuesta }) {
  return (
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        gap: 10,
      }}
    >
      <button
        onClick={abrirNuevaEncuesta}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <FaPlus />
        Nueva encuesta
      </button>
    </div>
  );
}
