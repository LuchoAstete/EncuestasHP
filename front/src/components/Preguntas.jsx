const Pregunta = ({
  pregunta,
  index,
  respuestas,
  errores,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
  handleTextoCheckbox,
  handleTextoRadio,
  handleMatrixChange,
}) => {
  return (
    <div id={`pregunta-${pregunta.cdPregunta}`} className="bloque">
      <h3>
        {index + 1}. {pregunta.texto}
      </h3>

      {pregunta.tipo === "radio" && (
        <div>
          {pregunta.opciones?.map((opcion) => {
            const selected = respuestas[pregunta.cdPregunta];
            const isSelected =
              typeof selected === "object"
                ? Number(selected.opcion) === Number(opcion.cdOpcion)
                : selected === opcion.cdOpcion;
            return (
              <div key={opcion.cdOpcion}>
                <label className={`option ${isSelected ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name={`pregunta_${pregunta.cdPregunta}`}
                    checked={isSelected}
                    onChange={() =>
                      handleRadioChange(
                        pregunta.cdPregunta,
                        opcion.cdOpcion,
                        opcion.requiereTexto
                      )
                    }
                  />
                  {opcion.texto}
                </label>

                {opcion.requiereTexto && isSelected && (
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Especifique..."
                    value={
                      typeof selected === "object" ? selected.texto || "" : ""
                    }
                    onChange={(e) =>
                      handleTextoRadio(pregunta.cdPregunta, e.target.value)
                    }
                  />
                )}
              </div>
            );
          })}
          {errores[pregunta.cdPregunta] && (
            <p className="error-text">{errores[pregunta.cdPregunta]}</p>
          )}
        </div>
      )}

      {pregunta.tipo === "checkbox" && (
        <div>
          {pregunta.opciones?.map((opcion) => {
            const selected = respuestas[pregunta.cdPregunta] || [];

            const isChecked = selected.some(
              (item) => Number(item.opcion) === Number(opcion.cdOpcion)
            );

            const selectedItem = selected.find(
              (item) => Number(item.opcion) === Number(opcion.cdOpcion)
            );

            return (
              <div key={opcion.cdOpcion}>
                <label className="option">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleCheckboxChange(
                        pregunta.cdPregunta,
                        opcion,
                        e.target.checked
                      )
                    }
                  />
                  {opcion.texto}
                </label>

                {opcion.requiereTexto && isChecked && (
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Especifique..."
                    value={selectedItem?.texto || ""}
                    onChange={(e) =>
                      handleTextoCheckbox(
                        pregunta.cdPregunta,
                        opcion.cdOpcion,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            );
          })}
          {errores[pregunta.cdPregunta] && (
            <p className="error-text">{errores[pregunta.cdPregunta]}</p>
          )}
        </div>
      )}

      {pregunta.tipo === "matrix" && (
        <>
          <table>
            <thead>
              <tr>
                <th>Aspecto</th>
                {[1, 2, 3, 4, 5].map((n) => (
                  <th key={n}>{n}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {pregunta.opciones?.map((aspecto) => {
                const selected = respuestas[pregunta.cdPregunta] || {};

                return (
                  <tr key={aspecto.cdOpcion}>
                    <td>{aspecto.texto}</td>

                    {[1, 2, 3, 4, 5].map((num) => (
                      <td key={num} className="celda-matrix">
                        <label className="matrix-option">
                          <input
                            type="radio"
                            name={`matrix_${aspecto.cdOpcion}`}
                            checked={selected[aspecto.cdOpcion] === num}
                            onChange={() =>
                              handleMatrixChange(
                                pregunta.cdPregunta,
                                aspecto.cdOpcion,
                                num
                              )
                            }
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {errores[pregunta.cdPregunta] && (
            <p className="error-text">{errores[pregunta.cdPregunta]}</p>
          )}
        </>
      )}

      {pregunta.tipo === "textarea" && (
        <>
          <textarea
            className="input-text"
            placeholder="Escriba su respuesta..."
            rows={3}
            maxLength={500}
            value={respuestas[pregunta.cdPregunta] || ""}
            onChange={(e) => handleChange(pregunta.cdPregunta, e.target.value)}
          />
          {errores[pregunta.cdPregunta] && (
            <p className="error-text">{errores[pregunta.cdPregunta]}</p>
          )}
        </>
      )}

      {pregunta.tipo === "text" && (
        <>
          <input
            type="text"
            className="input-text"
            placeholder="Escriba su respuesta..."
            maxLength={100}
            value={respuestas[pregunta.cdPregunta] || ""}
            onChange={(e) => handleChange(pregunta.cdPregunta, e.target.value)}
          />
          {errores[pregunta.cdPregunta] && (
            <p className="error-text">{errores[pregunta.cdPregunta]}</p>
          )}
        </>
      )}
    </div>
  );
};
export default Pregunta;
