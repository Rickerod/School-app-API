import { pool } from "../db.js";

export const getComments = async (req, res) => {
    const id_post = req.params.idPost

    try {
        const [comments] = await pool.query(`SELECT u.uri_image_profile, u.username, c.comment, a.fecha_action 
                            FROM comments c
                            INNER JOIN actions a ON c.id_comment = a.id_comment
                            INNER JOIN user u ON u.id_user = a.id_user
                            WHERE a.id_post = ?`, [id_post])
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