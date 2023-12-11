import { pool } from "../db.js";

export const getUsers = async (req, res) => {
    const school_id = req.params.idSchool

    const [users] = await pool.query(`SELECT id_user, uri_image_profile, id_type_user 
    FROM user WHERE school_id = ${school_id}`)
    res.json(users)
}

export const getUser = async (req, res) => {
    const id = req.params.idUser;

    const [users] = await pool.query(`
    SELECT id_user, username, firstname, lastname, uri_image_profile, user_description
    FROM user
    WHERE id_user = ?`, [id])
    res.json(users)
}

export const getNumPostsUser = async (req, res) => {
    const id = req.params.idUser;

    const [num_posts] = await pool.query(`
        SELECT COUNT(p.id_post) as num_posts 
        FROM post p 
        INNER JOIN user u ON u.id_user = p.id_author_post 
        WHERE p.id_author_post = ?`, [id])
    res.json(num_posts)
}