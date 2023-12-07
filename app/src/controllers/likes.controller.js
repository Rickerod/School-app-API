import { pool } from "../db.js";

export const insertLike = async (req, res) => {

    const id_post = req.params.idPost
    const id_user = req.params.idUser

    const { is_liked } = req.body;

    try {
        const sql = `
            INSERT INTO like_post(id_post, id_user, is_liked, fecha_like)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)  
        `;

        const [result] = await pool.query(sql, [id_post, id_user, is_liked]);

        const sql_liked = `UPDATE post 
            SET num_likes = num_likes + 1
            WHERE id_post = ?`

        const [result2] = await pool.query(sql_liked, [id_post]);

        res.json({
            ok: true,
            message: 'Like insertado por primera vez',
            report: {
                id: result.insertId
            }
        });

    } catch (err) {
        //console.log(err.code)
        if (err.code === 'ER_DUP_ENTRY') {
            const [result_update] = await pool.query(`UPDATE like_post  
                            SET is_liked = ${is_liked}, fecha_like = CURRENT_TIMESTAMP
                            WHERE id_post = ${id_post} AND id_user = ${id_user}`);

            var sql2;
            if (is_liked) {
                sql2 = `
                    UPDATE post 
                    SET num_likes = num_likes + 1
                    WHERE id_post = ?
                `;

            } else {
                sql2 = `
                    UPDATE post 
                    SET num_likes = num_likes - 1
                    WHERE id_post = ?
                `;

            }

            const [result2] = await pool.query(sql2, [id_post]);

            console.log(result2)
            res.json({
                ok: true,
                message: 'Like actualizador2',
                report: {
                    id: result_update.insertId
                }
            });
        }
        else {

            res.status(500).json({
                ok: false,
                message: 'Error al insertar like',
                error: err.message
            });

        }
    }
}