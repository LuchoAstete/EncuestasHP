import crypto from "crypto";

const SECRET = "HPMEDICAL_SECRET_2026";

export const generarToken = (cdSucursal) => {
  const payload = {
    cdSucursal,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");

  const firma = crypto
    .createHmac("sha256", SECRET)
    .update(payloadBase64)
    .digest("hex");

  return `${payloadBase64}.${firma}`;
};

export const validarToken = (token) => {
  try {
    const [payloadBase64, firma] = token.split(".");

    const firmaCorrecta = crypto
      .createHmac("sha256", SECRET)
      .update(payloadBase64)
      .digest("hex");

    if (firma !== firmaCorrecta) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString());

    return payload;
  } catch {
    return null;
  }
};
