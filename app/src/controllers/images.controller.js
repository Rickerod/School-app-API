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

export const uploadVideo = async (req, res) => {

    const {id_post, url_video, thumbnail_video} = req.body

    console.log(id_post, url_video)
    try{
        const sql = `UPDATE post
        SET video_url = ? , thumbnail_video = ?
        WHERE id_post = ?
        `
        const [result] = await pool.query(sql, [url_video, thumbnail_video, id_post])

        console.log(result)

        res.json({
            ok: true,
            message: 'video insertado correctamente',
            report: {
                id: result.insertId
            }
        });
    }catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar la tabla post',
            error: err.message
        });
    }
}