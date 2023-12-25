import { pool } from "../db.js";


export const disableComments = async (req, res) => {
    const disabled = req.params.disabled

    console.log("disabled", disabled)

    try {
        const sql = `UPDATE settings 
        SET show_comments = ?`

        const [result] = await pool.query(sql, [disabled])

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

    try {
        const sql = `SELECT show_comments
        FROM settings`

        const [result] = await pool.query(sql)

        res.json(result)

    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err.message
        });
    }
}