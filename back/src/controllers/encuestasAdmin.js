import {
    getSucursales,
    //getEncuestasVigentes,
    getSucursalPorToken,
    getEncuestasSucursal
} from "../services/encuestasAdmin.js";


export const listarSucursales = async (req, res) => {

    try {

        const data = await getSucursales();

        res.json(data);

    }
    catch (error) {

        res.status(500).json(error.message);

    }

};

/*
export const listarEncuestasVigentes = async (req, res) => {

    try {

        const data = await getEncuestasVigentes(
            req.params.cdEncuestaSucursal
        );

        res.json(data);

    }
    catch (error) {

        res.status(500).json(error.message);

    }

};*/


export const obtenerSucursalPorToken = async (req, res) => {

    try {

        const data = await getSucursalPorToken(
            req.params.token
        );

        res.json(data);

    }
    catch (error) {

        res.status(500).json(error.message);

    }

};

export const listarEncuestasSucursal = async (req, res) => {

    try {

        const data = await getEncuestasSucursal(
            req.params.cdSucursal
        );

        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);

    }

};