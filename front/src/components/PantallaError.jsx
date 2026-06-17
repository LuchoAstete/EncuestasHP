const PantallaError = ({ errorEncuesta }) => {
  return (
    <div className="final-container estado-container">
      <div className="estado-card">
        <div className="estado-icon error-icon">!</div>

        <h2>Encuesta no disponible</h2>

        <p>{errorEncuesta}</p>
      </div>
    </div>
  );
};

export default PantallaError;
