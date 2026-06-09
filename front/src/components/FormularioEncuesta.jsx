export default function FormularioEncuesta({ form, setForm, catalogos }) {
  return (
    <>
      <div>
        <label>Encuesta</label>

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
          <option value="">Seleccione una encuesta</option>

          {catalogos.encuestas.map((item) => (
            <option key={item.cdEncuesta} value={item.cdEncuesta}>
              {item.dsEncuesta}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Sucursal</label>

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
          <option value="">Seleccione una sucursal</option>

          {catalogos.sucursales.map((item) => (
            <option key={item.cdSucursal} value={item.cdSucursal}>
              {item.dsSucursal}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Origen</label>

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
          {catalogos.origenes.map((item) => (
            <option key={item.cdOrigen} value={item.cdOrigen}>
              {item.dsOrigen}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Fecha desde</label>

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
      </div>

      <br />

      <div>
        <label>Fecha hasta</label>

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

      <br />

      <div>
        <label>
          <input
            type="checkbox"
            checked={form.icActivo}
            onChange={(e) =>
              setForm({
                ...form,
                icActivo: e.target.checked,
              })
            }
          />
          Activa
        </label>
      </div>
    </>
  );
}
