import { pool } from "../db.js";


export const disableComments = async (req, res) => {
    const disabled = req.params.disabled
    const school_id = req.params.idSchool;
    console.log("disabled", disabled)
    console.log("school_id", school_id)

    try {
        const sql = `UPDATE school 
        SET show_comments = ?
            WHERE school_id = ?`

        const [result] = await pool.query(sql, [disabled, school_id])

        res.json({
            ok: true,
            message: 'Comentarios deshabilitados o habilitados correctamente!',
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al deshabilitar comentarios',
            error: err.message
        });
    }
}

export const getDisableComments = async (req, res) => {

    const school_id = req.params.idSchool;
    try {
        const sql = `SELECT show_comments
        FROM school
        WHERE school_id = ?`

        const [result] = await pool.query(sql, [school_id])

        res.json(result)

    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
}