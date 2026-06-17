const PantallaComenzar = ({ encuestas, setCdEncuestaSucursal }) => {
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
        {encuestas.length === 0 ? (
          <p className="sin-encuestas">
            No hay encuestas vigentes para esta sucursal.
          </p>
        ) : (
          <>
            {encuestas.length > 1 && (
              <h2 className="subtitulo-encuestas">Seleccione una encuesta</h2>
            )}

            {encuestas.map((encuesta) => (
              <button
                key={encuesta.cdEncuestaSucursal}
                className="btn"
                onClick={() =>
                  setCdEncuestaSucursal(encuesta.cdEncuestaSucursal)
                }
              >
                {encuesta.dsEncuesta}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default PantallaComenzar;
