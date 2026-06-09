export default function EncuestaModal({
  mostrarModal,
  cerrar,
  form,
  setForm,
  catalogos,
  guardarEncuesta,
}) {
  if (!mostrarModal) return null;

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
          width: 600,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <h2>Nueva encuesta</h2>

        <br />

        <select
          value={form.cdEncuesta}
          onChange={(e) =>
            setForm({
              ...form,
              cdEncuesta: e.target.value,
            })
          }
        >
          <option value="">Seleccione encuesta</option>

          {catalogos.encuestas.map((item) => (
            <option key={item.cdEncuesta} value={item.cdEncuesta}>
              {item.dsEncuesta}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select
          value={form.cdSucursal}
          onChange={(e) =>
            setForm({
              ...form,
              cdSucursal: e.target.value,
            })
          }
        >
          <option value="">Seleccione sucursal</option>

          {catalogos.sucursales.map((item) => (
            <option key={item.cdSucursal} value={item.cdSucursal}>
              {item.dsSucursal}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select
          value={form.cdOrigen}
          onChange={(e) =>
            setForm({
              ...form,
              cdOrigen: e.target.value,
            })
          }
        >
          <option value="">Seleccione origen</option>

          {catalogos.origenes?.map((item) => (
            <option key={item.cdOrigen} value={item.cdOrigen}>
              {item.dsOrigen}
            </option>
          ))}
        </select>

        <br />
        <br />

        <input
          type="date"
          value={form.dtFechaDesde}
          onChange={(e) =>
            setForm({
              ...form,
              dtFechaDesde: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="date"
          value={form.dtFechaHasta}
          onChange={(e) =>
            setForm({
              ...form,
              dtFechaHasta: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button onClick={guardarEncuesta}>Guardar</button>

        <button onClick={cerrar} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
