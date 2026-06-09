import sql from "mssql";
import { pool } from "../db.js";
import crypto from "crypto";

export const insertEncuesta = async (data) => {

    await pool.request()
        .input("accion", sql.VarChar, "INSERTAR")
        .input("cdEncuesta", sql.Int, data.cdEncuesta)
        .input("cdSucursal", sql.Int, data.cdSucursal)
        .input("dsToken", sql.UniqueIdentifier, crypto.randomUUID())
        .input("dtFechaDesde", sql.DateTime, data.dtFechaDesde)
        .input("dtFechaHasta", sql.DateTime, data.dtFechaHasta)
        .input("icActivo", sql.Bit, data.icActivo)
        .input("cdOrigen", sql.Int, data.cdOrigen)
        .execute("SPR_EncuestasSucursales");

};

export const getEncuestas = async () => {

    const result = await pool.request()
        .input("accion", sql.VarChar, "LISTAR")
        .execute("SPR_EncuestasSucursales");

    return result.recordset;

};

export const updateEncuesta = async (id, data) => {

    await pool.request()
        .input("accion", sql.VarChar, "ACTUALIZAR")
        .input("cdEncuestaSucursal", sql.Int, id)
        .input("dtFechaDesde", sql.DateTime, data.fechaInicio)
        .input("dtFechaHasta", sql.DateTime, data.fechaFin)
        .input("icActivo", sql.Bit, data.activa)
        .execute("SPR_EncuestasSucursales");

};

export const getCatalogos = async () => {


    const result = await pool.request()
        .execute("SPR_EncuestasCatalogos");

    return {
        encuestas: result.recordsets[0],
        sucursales: result.recordsets[1],
        origenes: result.recordsets[2]
    };

};