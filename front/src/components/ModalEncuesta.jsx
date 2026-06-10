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
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Nueva encuesta</h2>

        <div className="form-grid">
          <div className="campo">
            <label>Encuesta</label>
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
          </div>

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
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={cerrar}>
            Cancelar
          </button>

          <button className="btn-primary" onClick={guardarEncuesta}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
