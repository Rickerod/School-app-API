import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

//Raiz
router.get('/home/:id', async (req, res) => {

    const id = req.params.id;
    const school_id = 1
    console.log("Este es el id:", id)
    try {
        const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes
        FROM post p
        INNER JOIN user u ON u.id_user = p.id_author_post
        WHERE u.school_id = 1
        ORDER BY fecha_post DESC
        LIMIT 6 OFFSET 0`);


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

    const [users] = await pool.query(`SELECT id_user, username, firstname, lastname, uri_image_profile, user_description, type_user 
    FROM user WHERE id_user <> 1 AND school_id = 1`)
    res.json(users)

})

router.get('/profile/post/:id', async (req, res) => {
    //Parametros a recibir 
    const id = req.params.id
    const id_author_posts = 1
    const type_user = 1
    if (type_user === 1) {
        const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes 
        FROM post p 
        INNER JOIN user u ON p.id_author_post = u.id_user 
        WHERE p.id_author_post = ? AND p.post_category = "image"`, [id_author_posts])

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
                `, [post.id_post, id]);

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
    }

})

router.get('/profile/post/liked/:id', async (req, res) => {
    //Parametros a recibir 
    id_user = 1
    id_post = 1

    const [post] = await pool.query(`SELECT is_liked FROM like WHERE id_user = ? AND id_post = ?`, [id_user, id_post])
})

export default router;