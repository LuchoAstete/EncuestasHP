import * as encuestaService from "../services/encuestas.service.js";

export const listarSucursales = async (req, res) => {
  try {
    const data = await encuestaService.getSucursales();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const listarEncuestasSucursal = async (req, res) => {
  try {
    const data = await encuestaService.getEncuestasSucursal(
      req.params.cdSucursal
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEncuesta = async (req, res) => {
  try {
    const cdEncuestaSucursal = parseInt(
      req.params.cdEncuestaSucursal
    );

    const [titulo, preguntas, opciones] =
      await encuestaService.getEncuesta(
        cdEncuestaSucursal
      );

    if (titulo.length === 0) {
      return res.status(410).json({
        error: "Lo sentimos, esta encuesta ya no está disponible",
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
    console.log(error);

    res.status(500).json({
      error: "Lo sentimos, esta encuesta ya no se encuentra disponible",
    });
  }
};

export const guardarRespuestas = async (req, res) => {
  try {
    const {
      cdEncuestaSucursal,
      respuestas,
      cdOrigen,
    } = req.body;

    await encuestaService.guardarRespuestas(
      cdEncuestaSucursal,
      respuestas,
      cdOrigen
    );

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error al guardar respuestas",
    });
  }
};