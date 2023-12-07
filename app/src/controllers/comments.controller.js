import { pool } from "../db.js";

export const getComments = async (req, res) => {
    const id_post = req.params.idPost

    try {
        const [comments] = await pool.query(`SELECT u.uri_image_profile, u.username, c.comment, c.fecha_comment
                            FROM comments c
                            INNER JOIN user u on c.id_user = u.id_user
                            WHERE id_post = ?`, [id_post])
        res.json(comments)

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los comentarios',
            error: err.message
        });
    }
}

export const addComment = async (req, res) => {
    const id_post = req.params.idPost
    const id_user = req.params.idUser

    const { comment } = req.body;

    try {

        const sql = `INSERT INTO comments(id_post, id_user, comment, id_user_response, fecha_comment) VALUES (?, ?, ?, 0, CURRENT_TIMESTAMP)`

        const [result] = await pool.query(sql, [id_post, id_user, comment]);
        console.log(result)

        res.json({
            ok: true,
            message: 'Comentario insertado correctamente',
            report: {
                id: result.insertId
            }
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al insertar comentario',
            error: err.message
        });
    }
}