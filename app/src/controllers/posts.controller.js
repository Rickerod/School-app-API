import { pool } from "../db.js";

export const getPosts = async (req, res) => {
    const id = req.params.idUser;
    const school_id = req.params.idSchool;

    try {

        const query_posts = `SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes, p.thumbnail_video, p.video_url
        FROM post p
        INNER JOIN user u ON u.id_user = p.id_author_post
        WHERE u.school_id = ?
        ORDER BY p.id_post DESC
        LIMIT 6`

        const [posts] = await pool.query(query_posts, [school_id])

        // Obtener imágenes y videos
        const mediaPromises = posts.map(async post => {
            const [images] = await pool.query(`
                    SELECT url_image
                    FROM image
                    WHERE id_post = ?
                    ORDER BY position ASC
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

export const getPostPage = async (req, res) => {
    
    const id_user = req.params.idUser
    const first_id = req.params.firstId
    const last_id= req.params.lastId
    const school_id = req.params.idSchool;

    try{

        const sql = `SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes, p.thumbnail_video, p.video_url
        FROM post p
        INNER JOIN user u ON u.id_user = p.id_author_post
        WHERE u.school_id = ? AND ( p.id_post > ? OR p.id_post < ? )
        ORDER BY p.id_post DESC
        LIMIT 6`

        const [posts] = await pool.query(sql, [school_id, first_id, last_id])


        const mediaPromises = posts.map(async post => {
            const [images] = await pool.query(`
                    SELECT url_image
                    FROM image
                    WHERE id_post = ?
                    ORDER BY position ASC
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


    }catch(e){
        res.status(500).json({
            ok: false,
            message: 'Ocurrió un error al renderizar una nueva página.',
            error: e.message
        });

    }
}

export const getPostsProfile = async (req, res) => {

    //Parametros a recibir 
    const id = req.params.idUserProfile
    const id_user = req.params.idUser
    const type_post = req.params.typePost


    const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes,  p.thumbnail_video, p.video_url
        FROM post p 
        INNER JOIN user u ON p.id_author_post = u.id_user 
        WHERE p.id_author_post = ? AND p.post_category = ?`, [id, type_post])

    const mediaPromises = posts.map(async post => {
        const [images] = await pool.query(`
                    SELECT url_image 
                    FROM image
                    WHERE id_post = ?
                    ORDER BY position ASC
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

export const getPostsVideosProfile = async (req, res) => {
    const id = req.params.idUserProfile
    const id_user = req.params.idUser
    const type_post = req.params.typePost
    

    const [posts] = await pool.query(`SELECT p.id_post, p.id_author_post, u.username, u.firstname, u.uri_image_profile, p.post_description,
        p.post_category, p.num_likes 
        FROM post p 
        INNER JOIN user u ON p.id_author_post = u.id_user 
        WHERE p.id_author_post = ? AND p.post_category = ?`, [id, type_post])

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
            INSERT INTO post(id_author_post, post_description, post_category, fecha_post, num_likes, video_url) 
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0, NULL)
        `;

        const [result] = await pool.query(sql, [id_author_post, post_description, post_category]);

        // Devolver objeto con estado
        res.json({
            ok: true,
            message: 'Publicación insertada correctamente',
            report: {
                id: result.insertId,
                id_user: id_author_post,
            }
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error al insertar la publicación',
            error: err.message
        });

    }

}

export const removePost = async (req, res) => {
    const id_post = req.params.idPost

    try{

        const sql = `
                DELETE FROM post 
                WHERE id_post = ?
            `;

        const sql_image = `DELETE FROM image WHERE id_post = ?`

        //const [result_image] = await pool.query(sql_image, [id_post])
        const [result] = await pool.query(sql, [id_post])

        res.json({
            ok: true,
            message: 'Publicación eliminada correctamente',
        });

    }catch(e){
        res.status(500).json({
            ok: false,
            message: 'Ocurrio un error al eliminar la publicación',
            error: e.message
        });
    }
}