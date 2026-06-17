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

  export default transformarPayload;