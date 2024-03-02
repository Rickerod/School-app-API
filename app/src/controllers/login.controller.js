import { pool } from "../db.js";

export const login = async (req, res) => {
    const { username, password } = req.body; // Usar req.body para ambos, username y password

    // Verificar que tanto el usuario como la contraseña se hayan proporcionado
    if (!username || !password) {
        return res.status(400).json({
            ok: false,
            message: 'Se requieren el nombre de usuario y la contraseña'
        });
    }

    try {
        const query = `
            SELECT *
            FROM user u
            WHERE u.loginuser = ? AND u.password = ?;
        `;

        const [users] = await pool.query(query, [username, password]);

        // Verificar si se encontró un usuario
        if (users.length > 0) {
            const user_logged = users[0]; // Asumiendo que el nombre de usuario es único
            res.status(200).json({
                ok: true,
                message: 'Credenciales correctas',
                user: {
                    id: user_logged.id_user,
                    type_user: user_logged.id_type_user,
                    uri_image_profile: user_logged.uri_image_profile,
                    username: user_logged.username,
                    school_id: user_logged.school_id
                }
            });
        } else {
            // Credenciales incorrectas
            res.status(401).json({
                ok: false,
                message: 'Credenciales incorrectas'
            });
        }
    } catch (err) {
        // Manejar errores de la base de datos o del servidor
        res.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión',
            error: err.message
        });
    }
}