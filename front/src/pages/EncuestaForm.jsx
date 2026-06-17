import React, { useState, useEffect } from "react";
import "../styles/index.css";
import Pregunta from "../components/Preguntas";
import PantallaCarga from "../components/PantallaCarga";
import PantallaComenzar from "../components/PantallaComenzar";
import PantallaFinal from "../components/PantallaFinal";
import PantallaError from "../components/PantallaError";

const EncuestaForm = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [cargando, setCargando] = useState(false);
  const [encuestaFinalizada, setEncuestaFinalizada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const cdSucursal = window.location.pathname.split("/").pop();
  const [encuestas, setEncuestas] = useState([]);
  const [cdEncuestaSucursal, setCdEncuestaSucursal] = useState(
    sessionStorage.getItem("cdEncuestaSucursal")
  );
  const [errorEncuesta, setErrorEncuesta] = useState(null);
  const [origenEncuesta, setOrigenEncuesta] = useState("1");

  useEffect(() => {
    const cargarEncuestas = async () => {
      try {
        setCargando(true);

        const response = await fetch(
          `${API_URL}/api/sucursales/${cdSucursal}/encuestas`
        );

        const data = await response.json();

        setEncuestas(data);
      } catch (error) {
        console.error(error);
        setErrorEncuesta("No pudimos cargar las encuestas.");
      } finally {
        setCargando(false);
      }
    };

    cargarEncuestas();
  }, []);

  useEffect(() => {
    if (!cdEncuestaSucursal) return;
    const cargarDatos = async () => {
      try {
        setCargando(true);

        const response = await fetch(
          `${API_URL}/api/encuestas/${cdEncuestaSucursal}`,
          {
            cache: "no-store",
          }
        );
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
  }, [cdEncuestaSucursal]);

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
      const response = await fetch(`${API_URL}/api/respuestas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cdEncuestaSucursal,
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
    return <PantallaCarga />;
  }

  if (!cdEncuestaSucursal && origenEncuesta === "1") {
    return (
      <PantallaComenzar
        encuestas={encuestas}
        setCdEncuestaSucursal={setCdEncuestaSucursal}
      />
    );
  }

  if (encuestaFinalizada) {
    return <PantallaFinal />;
  }

  if (errorEncuesta) {
    return <PantallaError mensaje={errorEncuesta} />;
  }

  return (
    <div className="container">
      <div className="header-encuesta">
        <h1>{titulo}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {preguntas.map((pregunta, index) => (
          <Pregunta
            key={pregunta.cdPregunta}
            pregunta={pregunta}
            index={index}
            respuestas={respuestas}
            errores={errores}
            handleChange={handleChange}
            handleRadioChange={handleRadioChange}
            handleCheckboxChange={handleCheckboxChange}
            handleTextoCheckbox={handleTextoCheckbox}
            handleTextoRadio={handleTextoRadio}
            handleMatrixChange={handleMatrixChange}
          />
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
