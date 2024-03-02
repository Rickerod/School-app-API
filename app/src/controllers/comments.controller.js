import { pool } from "../db.js";

export const getComments = async (req, res) => {
    const id_post = req.params.idPost

    try {
        const [comments] = await pool.query(`SELECT c.id_comment, u.uri_image_profile, u.username, c.comment, a.fecha_action 
                            FROM comments c
                            INNER JOIN actions a ON c.id_comment = a.id_comment
                            INNER JOIN user u ON u.id_user = a.id_user
                            WHERE a.id_post = ?
                            ORDER BY c.id_comment DESC
                            LIMIT 15`, [id_post])
        res.json(comments)

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener los comentarios',
            error: err.message
        });
    }
}

export const getCommentsPage = async (req, res) => {
    const id_post = req.params.idPost
    const id_last_comment = req.params.idComment

    console.log(id_post, id_last_comment)

    try {
        const [comments] = await pool.query(`SELECT c.id_comment, u.uri_image_profile, u.username, c.comment, a.fecha_action 
                            FROM comments c
                            INNER JOIN actions a ON c.id_comment = a.id_comment
                            INNER JOIN user u ON u.id_user = a.id_user
                            WHERE a.id_post = ? AND c.id_comment < ?
                            ORDER BY c.id_comment DESC
                            LIMIT 15`, [id_post, id_last_comment])
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

    //Hacer transacciones atomicas posteriormente

    try {

        const sql = `INSERT INTO comments(comment, id_user_response) VALUES (?, 0)`

        const [result] = await pool.query(sql, [comment]);
        console.log(result)

        const sql_action = `INSERT INTO actions(id_user, id_post, id_comment, id_report_post, fecha_action) VALUES (?, ?, ?, NULL, now())`

        const [result_action] = await pool.query(sql_action, [id_user, id_post, result.insertId]);


        res.json({
            ok: true,
            message: 'Comentario insertado correctamente',
            report: {
                id: result.insertId,
                id_action: result_action.insertId
            }
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            message: 'Error al insertar comentario',
            error: err.message
        });
    }
}

export const removeComment = async (req, res) => {
    const {id_comment} = req.body

    console.log("id_comment", id_comment)
    try {
        const sql_comment = `DELETE FROM comments WHERE id_comment = ?`;
        const [result_comment] = await pool.query(sql_comment, [id_comment]);

        res.json({
            ok: true,
            message: 'Comentario eliminado correctamente.',
        });

    } catch (err) {
        
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar el comentario.',
            error: err.message
        });
    }
}