import { pool } from "../db.js";

export const uploadImages = async (req, res) => {
    try {
        const { id_post, url_image, position } = req.body;

        const sql = `
            INSERT INTO image(position, id_post, url_image)
            VALUES (?, ?, ?)  
        `;

        const [result] = await pool.query(sql, [position, id_post, url_image]);

        // Devolver objeto con estado
        res.json({
            ok: true,
            message: 'Imagen insertarda correctamente',
            report: {
                id: result.insertId
            }
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            message: 'Error al insertar la imagen',
            error: err.message
        });
    }
}