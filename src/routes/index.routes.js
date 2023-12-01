import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

//Raiz
router.get('/home', async (req, res) => {

    //console.log(req)
    const { id } = req.query;

    try {
        const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes
        FROM post p
        INNER JOIN user u ON u.id_user = p.id_author_post
        WHERE u.school_id = 1
        ORDER BY p.id_post DESC
        LIMIT 6
        `);


        // ultima_fecha, primera_fecha, paginación
        /* const [posts2] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, p.post_description,
        p.post_category
        FROM post p
        INNER JOIN user u ON u.id_user = p.id_author_post
        WHERE p.id_post > last_id AND p.id_post < first_id
        ORDER BY fecha_post DESC
        LIMIT 10 OFFSET 0`);

        res.json(posts2); */

        // Obtener imágenes y videos
        const mediaPromises = posts.map(async post => {
            const [images] = await pool.query(`
                    SELECT url_image
                    FROM image
                    WHERE id_post = ?
                    `, [post.id_post]);

            const [videos] = await pool.query(`
                    SELECT url_video
                    FROM video
                    WHERE id_post = ?
                `, [post.id_post]);

            const [like] = await pool.query(`
                SELECT is_liked
                FROM like_post
                WHERE id_post = ? AND id_user = ?
            `, [post.id_post, 1]);

            var is_liked = 0

            if (like[0] !== undefined) {
                is_liked = like[0].is_liked
            }

            return {
                ...post,
                images,
                videos,
                is_liked
            };
        });

        const media = await Promise.all(mediaPromises);
        res.json(media)

        /* const postIds = posts.map(post => post.id_post)
        console.log(postIds) */
        /* const [uri_images] = await pool.query(`SELECT i.id_post, i.uri_image FROM image i WHERE i.id_post IN ?`, [postIds])
        console.log(uri_images) */

    } catch (error) {
        return res.status(500).json({ message: error.stack });
    }
})

router.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    const school_id = 1

    const [users] = await pool.query(`SELECT id_user, uri_image_profile, type_user 
    FROM user WHERE school_id = 1`)
    res.json(users)

})

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id;
    const school_id = 1

    const [users] = await pool.query(`
    SELECT id_user, username, firstname, lastname, uri_image_profile, user_description
    FROM user
    WHERE id_user = ?`, [id])
    res.json(users)
})

router.get('/profile/numPosts/:id', async (req, res) => {
    const id = req.params.id;

    const [num_posts] = await pool.query(`
        SELECT COUNT(p.id_post) as num_posts 
        FROM post p 
        INNER JOIN user u ON u.id_user = p.id_author_post 
        WHERE p.id_author_post = ?`, [id])
    res.json(num_posts)
})


router.post('/report/:id', async (req, res) => {
    const id = req.params.id;

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
})



router.post('/newPost/:id', async (req, res) => {

    const id_author_post = req.params.id;

    const { post_description, post_category } = req.body;

    try {
        const sql = `
            INSERT INTO post(id_author_post, post_description, post_category, fecha_post, num_likes) 
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
        `;

        const [result] = await pool.query(sql, [id_author_post, post_description, post_category]);

        // Devolver objeto con estado
        res.json({
            ok: true,
            message: 'Publicacion insertada correctamente',
            report: {
                id: result.insertId,
                id_user: id_author_post,
            }
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error al insertar la publicacion',
            error: err.message
        });

    }

});

router.post('/upload', async (req, res) => {

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
)

router.get('/profile/post/:userProfile/:userId', async (req, res) => {
    //Parametros a recibir 
    const id = req.params.userProfile
    const id_user = req.params.userId

    const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes 
        FROM post p 
        INNER JOIN user u ON p.id_author_post = u.id_user 
        WHERE p.id_author_post = ? AND p.post_category = "imagen"`, [id])

    const mediaPromises = posts.map(async post => {
        const [images] = await pool.query(`
                    SELECT url_image 
                    FROM image
                    WHERE id_post = ?
                    `, [post.id_post]);

        const [like] = await pool.query(`
                    SELECT is_liked
                    FROM like_post
                    WHERE id_post = ? AND id_user = ?
                `, [post.id_post, id_user]);

        var is_liked = 0

        if (like[0] !== undefined) {
            is_liked = like[0].is_liked
        }
        return {
            ...post,
            images,
            is_liked
        };
    });

    const media = await Promise.all(mediaPromises);
    res.json(media)


})


router.post('/like/:idPost/:idUser', async (req, res) => {

    const id_post = req.params.idPost
    const id_user = req.params.idUser

    const { is_liked } = req.body;

    try {
        const sql = `
            INSERT INTO like_post(id_post, id_user, is_liked, fecha_like)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)  
        `;

        const [result] = await pool.query(sql, [id_post, id_user, is_liked]);
        console.log(result)

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
            res.json({
                ok: true,
                message: 'Like actualizador',
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
})

router.get('/comments/:id', async (req, res) => {

    const id_post = req.params.id

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

})


router.get('/reports', async (req, res) => {
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
})

router.post('/dislike', async (req, res) => {

})

router.post('/comment/:idPost/:idUser', async (req, res) => {

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
})


export default router;