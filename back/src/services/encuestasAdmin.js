import sql from "mssql";
import { pool } from "../db.js";

export const getSucursales = async () => {

    const result = await pool.request()
        .input("accion", sql.VarChar, "LISTAR_SUCURSALES")
        .execute("SPR_EncuestasSucursales");

    return result.recordset;

};

/*export const getEncuestasVigentes = async (cdEncuestaSucursal) => {

    const result = await pool.request()
        .input("accion", sql.VarChar, "LISTAR_ENCUESTAS_VIGENTES")
        .input("cdEncuestaSucursal", sql.Int, cdEncuestaSucursal)
        .execute("SPR_EncuestasSucursales");

    return result.recordset;

};*/

export const getSucursalPorToken = async (token) => {

    const result = await pool.request()
        .input("accion", sql.VarChar, "OBTENER_POR_TOKEN")
        .input("dsToken", sql.UniqueIdentifier, token)
        .execute("SPR_EncuestasSucursales");

    return result.recordset[0];

};

export const getEncuestasSucursal = async (cdSucursal) => {

    const result = await pool.request()
        .input("accion", sql.VarChar, "LISTAR_ENCUESTAS_VIGENTES")
        .input("cdSucursal", sql.Int, cdSucursal)
        .execute("SPR_EncuestasSucursales");

    return result.recordset;
};