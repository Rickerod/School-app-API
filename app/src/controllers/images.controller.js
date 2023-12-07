import { pool } from "../db.js";

export const uploadImages = async (req, res) => {
    try {
        const { id_post, url_image } = req.body;

        console.log(id_post)
        console.log(url_image)
        const sql = `
            INSERT INTO image(id_post, url_image)
            VALUES (?, ?)  
        `;

        const [result] = await pool.query(sql, [id_post, url_image]);

        // Devolver objeto con estado
        res.json({
            ok: true,
            message: 'Imagen insertarda correctamente',
            report: {
                id: result.insertId
            }
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al insertar la imagen',
            error: err.message
        });
    }
}