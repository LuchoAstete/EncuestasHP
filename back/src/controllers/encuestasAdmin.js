import {
    getEncuestas,
    insertEncuesta,
    updateEncuesta,
    getCatalogos
} from "../services/encuestasAdmin.js";

export const listarEncuestas = async (req, res) => {
    try {

        const data = await getEncuestas();

        res.json(data);

    } catch (error) {

        res.status(500).json(error.message);

    }
};

export const crearEncuesta = async (req, res) => {

    try {

        await insertEncuesta(req.body);

        res.json({
            ok: true,
            mensaje: "Encuesta creada"
        });

    } catch (error) {

        res.status(500).json(error.message);

    }

};

export const actualizarEncuesta = async (req, res) => {

    try {

        await updateEncuesta(req.params.id, req.body);

        res.json({
            ok: true
        });

    } catch (error) {

        res.status(500).json(error.message);

    }

};

export const listarCatalogos = async (req, res) => {

    try {

        const data = await getCatalogos();

        res.json(data);

    } catch (error) {

        res.status(500).json(error.message);

    }

};

/*export const regenerarToken = async (req, res) => {

    try {

        const token = await renovarToken(req.params.id);

        res.json(token);

    } catch (error) {

        res.status(500).json(error.message);

    }

};*/