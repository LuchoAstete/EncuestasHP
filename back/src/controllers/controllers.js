import { pool, poolConnect } from "../db.js";

const transformarPayload = (respuestas) => {
  const detalles = [];

  for (const preguntaId in respuestas) {
    const valor = respuestas[preguntaId];

    // 1. RADIO simple o TEXT
    if (typeof valor !== "object" || valor === null) {
      detalles.push({
        cdPregunta: Number(preguntaId),
        cdOpcion: Number(valor) || null,
        vlValor: null,
        dsRespuestaDetalle: typeof valor === "string" ? valor : null,
      });
    }

    // 2. CHECKBOX
    else if (Array.isArray(valor)) {
      valor.forEach((v) => {
        detalles.push({
          cdPregunta: Number(preguntaId),
          cdOpcion: Number(v.opcion),
          vlValor: null,
          dsRespuestaDetalle: v.texto || null,
        });
      });
    }

    // 3. OBJETO
    else {
      // RADIO con texto
      if (valor.opcion !== undefined) {
        detalles.push({
          cdPregunta: Number(preguntaId),
          cdOpcion: Number(valor.opcion),
          vlValor: null,
          dsRespuestaDetalle: valor.texto || null,
        });
      }

      // MATRIX
      else {
        for (const aspectoId in valor) {
          detalles.push({
            cdPregunta: Number(preguntaId),
            cdOpcion: Number(aspectoId),
            vlValor: Number(valor[aspectoId]),
            dsRespuestaDetalle: null,
          });
        }
      }
    }
  }

  return detalles;
};

export const getEncuesta = async (req, res) => {
  try {
    await poolConnect;

    const token = req.params.token;

    const result = await pool
      .request()
      .input("token", token)
      .execute("Get_Encuestas");

    const titulo = result.recordsets[0];
    const preguntas = result.recordsets[1];
    const opciones = result.recordsets[2];

    if (!titulo.length) {
      return res.status(404).json({
        error: "Encuesta no válida",
      });
    }

    const encuesta = preguntas.map((p) => {
      const opcionesFiltradas = opciones
        .filter((o) => o.cdPregunta === p.cdPregunta)
        .map((o) => ({
          cdOpcion: o.cdOpcion,
          texto: o.dsRespuestaOpcion,
          requiereTexto: o.icRequiereTexto,
          obligatoria: p.icObligatoria,
        }));

      return {
        cdPregunta: p.cdPregunta,
        tipo: p.dsTipo,
        texto: p.dsPregunta,
        opciones: opcionesFiltradas,
        obligatoria: p.icObligatoria,
      };
    });

    res.json({
      titulo: titulo[0].dsEncuesta,
      descripcion: titulo[0].dsDescripcion,
      preguntas: encuesta,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener encuesta1",
    });
  }
};

export const guardarRespuestas = async (req, res) => {
  try {
    await poolConnect;

    const { token, respuestas } = req.body;

    const detalles = transformarPayload(respuestas);

    await pool
      .request()
      .input("token", token)
      .input("json", JSON.stringify(detalles))
      .execute("Insert_Respuestas");

    res.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al guardar respuestas",
    });
  }
};
