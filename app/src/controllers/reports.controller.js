import { pool } from "../db.js";

export const getReports = async (req, res) => {
    try {
        const [reports] = await pool.query(
            `SELECT u.id_user, u.uri_image_profile, u.username, r.id_report, r.report_description
             FROM user u
             INNER JOIN report r ON u.id_user = r.id_user
             `
        )

        res.json(reports)
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los comentarios',
            error: err.message
        });
    }
}

export const addReportUser = async (req, res) => {
    const id = req.params.idUser;

    // Obtener datos del body
    const { report_description } = req.body;

    try {
        // Query INSERT
        const sql = `INSERT INTO report (id_user, report_description) 
                   VALUES (?, ?)`;

        const [result] = await pool.query(sql, [id, report_description]);

        // Devolver objeto con estado
        res.json({
            ok: true,
            message: 'Reporte creado correctamente',
            report: {
                id: result.insertId,
                id_user: id,
                report_description
            }
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error creando el reporte: ',
            error: err.message
        });

    }
}