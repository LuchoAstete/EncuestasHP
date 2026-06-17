import sql from "mssql";
import { pool } from "../db.js";
import transformarPayload from "../helpers/respuestas.helper.js";

export const getSucursales = async (cdSucursal) => {
  const result = await pool.request()
    .input("accion", sql.VarChar, "LISTAR_SUCURSALES")
    .input("cdSucursal", sql.Int, cdSucursal)
    .execute("SPR_EncuestasSucursales");

  return result.recordset;
};

export const getEncuestasSucursal = async (cdSucursal) => {
  const result = await pool.request()
    .input("accion", sql.VarChar, "LISTAR_ENCUESTAS_VIGENTES")
    .input("cdSucursal", sql.Int, cdSucursal)
    .execute("SPR_EncuestasSucursales");

  return result.recordset;
};

export const getSucursalPorToken = async (token) => {
  const result = await pool.request()
    .input("accion", sql.VarChar, "OBTENER_POR_TOKEN")
    .input("dsToken", sql.UniqueIdentifier, token)
    .execute("SPR_EncuestasSucursales");

  return result.recordset[0];
};

export const getEncuesta = async (cdEncuestaSucursal) => {
  const result = await pool.request()
    .input("cdEncuestaSucursal", sql.Int, cdEncuestaSucursal)
    .execute("Get_Encuestas");

  return result.recordsets;
};

export const guardarRespuestas = async (
  cdEncuestaSucursal,
  respuestas,
  cdOrigen
) => {

  const detalles = transformarPayload(respuestas);

  await pool.request()
    .input("cdEncuestaSucursal", sql.Int, cdEncuestaSucursal)
    .input("json", sql.NVarChar(sql.MAX), JSON.stringify(detalles))
    .input("cdOrigen", sql.Int, cdOrigen)
    .execute("Insert_Respuestas");
};