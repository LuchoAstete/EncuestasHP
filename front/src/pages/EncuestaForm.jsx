import React, { useState, useEffect } from "react";
import "../styles/index.css";

const EncuestaForm = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [encuestaFinalizada, setEncuestaFinalizada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const token = window.location.pathname.split("/").pop();
  const [errores, setErrores] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [comenzar, setComenzar] = useState(false);
  const [errorEncuesta, setErrorEncuesta] = useState(null);
  const [origenEncuesta, setOrigenEncuesta] = useState("1");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/encuestas/${token}`, {
          cache: "no-store",
        });
        const data = await response.json();
        const params = new URLSearchParams(window.location.search);
        const fromQR = params.get("qr");

        if (fromQR === "1") {
          setOrigenEncuesta(1);
        } else if (sessionStorage.getItem("origenEncuesta") === "2") {
          setOrigenEncuesta(2);
        }

        if (!response.ok) {
          setErrorEncuesta(data.error || "¡Lo sentimos!");

          setCargando(false);
          return;
        }

        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setPreguntas(data.preguntas || []);
      } catch (error) {
        console.error(error);

        setErrorEncuesta("No pudimos conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const limpiarError = (cdPregunta) => {
    setErrores((prev) => {
      const nuevos = { ...prev };
      delete nuevos[cdPregunta];
      return nuevos;
    });
  };

  const handleChange = (cdPregunta, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [cdPregunta]: valor,
    }));

    limpiarError(cdPregunta);
  };

  const handleRadioChange = (cdPregunta, cdOpcion, requiereTexto) => {
    setRespuestas((prev) => ({
      ...prev,
      [cdPregunta]: requiereTexto ? { opcion: cdOpcion, texto: "" } : cdOpcion,
    }));

    limpiarError(cdPregunta);
  };

  const handleCheckboxChange = (cdPregunta, opcion, checked) => {
    setRespuestas((prev) => {
      const actual = prev[cdPregunta] || [];

      if (checked) {
        return {
          ...prev,
          [cdPregunta]: [
            ...actual,
            opcion.requiereTexto
              ? { opcion: opcion.cdOpcion, texto: "" }
              : { opcion: opcion.cdOpcion },
          ],
        };
      } else {
        return {
          ...prev,
          [cdPregunta]: actual.filter(
            (item) => item.opcion !== opcion.cdOpcion
          ),
        };
      }
    });

    limpiarError(cdPregunta);
  };

  const handleTextoCheckbox = (cdPregunta, cdOpcion, texto) => {
    setRespuestas((prev) => {
      const actual = prev[cdPregunta] || [];

      return {
        ...prev,
        [cdPregunta]: actual.map((item) =>
          item.opcion === cdOpcion ? { ...item, texto } : item
        ),
      };
    });

    limpiarError(cdPregunta);
  };

  const handleTextoRadio = (cdPregunta, texto) => {
    setRespuestas((prev) => ({
      ...prev,
      [cdPregunta]: {
        ...prev[cdPregunta],
        texto,
      },
    }));

    limpiarError(cdPregunta);
  };

  const handleMatrixChange = (cdPregunta, cdOpcion, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [cdPregunta]: {
        ...prev[cdPregunta],
        [cdOpcion]: valor,
      },
    }));

    limpiarError(cdPregunta);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    for (const pregunta of preguntas) {
      if (pregunta.obligatoria) {
        const respuesta = respuestas[pregunta.cdPregunta];

        const vacio =
          respuesta === undefined ||
          respuesta === null ||
          respuesta === "" ||
          (Array.isArray(respuesta) && respuesta.length === 0) ||
          (typeof respuesta === "object" &&
            !Array.isArray(respuesta) &&
            Object.keys(respuesta).length === 0);

        if (vacio) {
          nuevosErrores[pregunta.cdPregunta] = "Esta pregunta es obligatoria.";
        }
      }
    }

    setErrores(nuevosErrores);

    const primerError = Object.keys(nuevosErrores)[0];

    if (primerError) {
      document.getElementById(`pregunta-${primerError}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);
    try {
      const response = await fetch(`${API_URL}/api/encuestas/respuestas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          respuestas,
          cdOrigen: origenEncuesta,
        }),
      });

      const data = await response.json();

      setEncuestaFinalizada(true);
      setRespuestas({});

      /*setTimeout(() => {
        setMostrarPopup(false);
      }, 4000);*/

      setEnviando(false);
    } catch (error) {
      console.error("Error al enviar respuestas", error);
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <div className="bienvenida-container estado-container">
        <div className="estado-card">
          <div className="spinner"></div>

          <h2>Cargando encuesta</h2>

          <p>Espere un momento...</p>
        </div>
      </div>
    );
  }

  if (!comenzar) {
    return (
      <div className="bienvenida-container">
        <div className="bienvenida-card">
          <img src="/HP.png" alt="" className="logo-bienvenida" />
          {/*<h1>{titulo}</h1>*/}
          <h1 className="titulo-bienvenida">Su opinión nos ayuda a mejorar</h1>
          <p className="descripcion">
            Queremos conocer su experiencia
            <br /> La encuesta tomará menos de 1 minuto.
          </p>

          <button
            className="btn btn-comenzar"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              setComenzar(true);
            }}
          >
            Comenzar Encuesta
          </button>
        </div>
      </div>
    );
  }

  if (encuestaFinalizada) {
    return (
      <div className="final-container">
        <div className="popup-final">
          <div className="popup-check">✓</div>

          <h1>Respuestas enviadas</h1>

          <p>
            Encuesta finalizada correctamente.
            <br />
            Gracias por su tiempo.
          </p>
        </div>
      </div>
    );
  }

  if (errorEncuesta) {
    return (
      <div className="final-container estado-container">
        <div className="estado-card">
          <div className="estado-icon error-icon">!</div>

          <h2>Encuesta no disponible</h2>

          <p>{errorEncuesta}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-encuesta">
        <h1>{titulo}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {preguntas.map((pregunta, index) => (
          <div
            id={`pregunta-${pregunta.cdPregunta}`}
            key={pregunta.cdPregunta}
            className="bloque"
          >
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
                      <label
                        className={`option ${isSelected ? "selected" : ""}`}
                      >
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
                            typeof selected === "object"
                              ? selected.texto || ""
                              : ""
                          }
                          onChange={(e) =>
                            handleTextoRadio(
                              pregunta.cdPregunta,
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
                  onChange={(e) =>
                    handleChange(pregunta.cdPregunta, e.target.value)
                  }
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
                  onChange={(e) =>
                    handleChange(pregunta.cdPregunta, e.target.value)
                  }
                />
                {errores[pregunta.cdPregunta] && (
                  <p className="error-text">{errores[pregunta.cdPregunta]}</p>
                )}
              </>
            )}
          </div>
        ))}
        {Object.keys(errores).length > 0 && (
          <div className="form-error">
            Por favor, complete las preguntas obligatorias.
          </div>
        )}
        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar Respuestas"}
        </button>
      </form>
    </div>
  );
};

export default EncuestaForm;
