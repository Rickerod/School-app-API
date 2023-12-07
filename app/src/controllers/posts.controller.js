import { pool } from "../db.js";

export const getPosts = async (req, res) => {
    console.log("paso por aca posts!")
    const id = req.params.idUser;

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
            `, [post.id_post, id]);

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




    /* try {
      const [rows] = await pool.query("SELECT * FROM employee");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    } */
};


export const getPostsProfile = async (req, res) => {

    //Parametros a recibir 
    const id = req.params.idUserProfile
    const id_user = req.params.idUser

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

}


export const addPost = async (req, res) => {
    const id_author_post = req.params.idUser;

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

}