import { pool } from "../db.js";

export const getSurvey = async (req, res) => {
    const user_id = req.params.idUser
    const user_id_profile = req.params.idUserProfile
    console.log(user_id)
    try {

        const sql_survey = `
        WITH response_alternative AS (
            SELECT al.id_survey , a.id_user, MAX(fecha_answer) AS max_fecha_answer
            FROM answer_alternative a
            INNER JOIN alternative al ON a.id_alternative = al.id_alternative
            GROUP BY al.id_survey, a.id_user
           HAVING MAX(a.fecha_answer)
         ),
            cantidad_answers AS (
            SELECT al.id_survey, a.id_alternative, COUNT(a.id_alternative) as cantidad
            FROM answer_alternative a
            RIGHT JOIN alternative al ON a.id_alternative = al.id_alternative
            INNER JOIN response_alternative ra ON ra.id_survey = al.id_survey AND ra.id_user = a.id_user AND
            a.fecha_answer = ra.max_fecha_answer
            GROUP BY al.id_survey, a.id_alternative
         )
         
         SELECT al.id_survey, al.alternative, s.question_survey,  al.id_alternative, ca.cantidad
         FROM cantidad_answers ca
         RIGHT JOIN alternative al ON ca.id_alternative = al.id_alternative
         INNER JOIN survey s ON al.id_survey = s.id_survey
         WHERE s.id_author_survey = ?
         
        `
        const [surveys] = await pool.query(sql_survey, user_id_profile)

        const sql_survey_user = `
        WITH response_alternative AS (
            SELECT al.id_survey , a.id_user, MAX(fecha_answer) AS max_fecha_answer
            FROM answer_alternative a
            INNER JOIN alternative al ON a.id_alternative = al.id_alternative
            GROUP BY al.id_survey, a.id_user
           HAVING MAX(a.fecha_answer)
         )
         
        SELECT al.id_survey, a.id_alternative, a.id_user
        FROM answer_alternative a
        LEFT JOIN alternative al ON a.id_alternative = al.id_alternative
        INNER JOIN response_alternative ra ON ra.id_survey = al.id_survey AND ra.id_user = a.id_user AND
        a.fecha_answer = ra.max_fecha_answer
        WHERE a.id_user = ?
        `

        const [user_survey] = await pool.query(sql_survey_user, [user_id])

        const result = [];

        surveys.forEach(item => {
            const existingSurvey = result.find(r => r.id_survey === item.id_survey);

            if (existingSurvey) {
                existingSurvey.alternatives.push({
                    id_alternative: item.id_alternative,
                    alternative: item.alternative,
                    cantidad: item.cantidad ?? 0
                });
            } else {
                result.push({
                    id_survey: item.id_survey,
                    question_survey: item.question_survey,
                    alternatives: [{
                        id_alternative: item.id_alternative,
                        alternative: item.alternative,
                        cantidad: item.cantidad ?? 0
                    }]
                });
            }
        });

        const user_survey_ids = user_survey.map(item => {
            return item.id_survey;
        });
        console.log(user_survey)
        console.log("survey_ids", user_survey_ids)

         for (let i = 0; i< result.length; i++) {
            var indice = user_survey_ids.indexOf(result[i].id_survey)
            if(indice !== -1){
                result[i].user_response = user_survey[indice].id_alternative
            } else {
                result[i].user_response = 0
            }
        } 

        res.json(result)


    } catch (e) {
        return res.status(500).json({ message: e });
    }
}

export const insertAnswerSurvey = async (req, res) => {
    
    const {id_alternative, id_user} = req.body;
    console.log("Hola a todos")
    console.log(id_alternative, id_user)

    const currentDate = new Date().toISOString().slice(0, 23);

    try {
        const sql = `
            INSERT INTO answer_alternative(id_alternative, id_user)
            VALUES (?, ?)  
        `;

        console.log("currentDate", currentDate)
        const [result] = await pool.query(sql, [id_alternative, id_user]);

        res.json({
            ok: true,
            message: 'Respuesta de la encuesta ingresada correctamente.',
            report: {
                id: result.insertId
            }
        });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            const [result_update] = await pool.query(`UPDATE answer_alternative
                            SET fecha_answer = CURRENT_TIMESTAMP
                            WHERE id_alternative = ${id_alternative} AND id_user = ${id_user}`);

            res.json({
                ok: true,
                message: 'Alternativa de la encuesta acutalizada.',
                report: {
                    id: result_update.insertId
                }
            });
        }
        else {

            res.status(500).json({
                ok: false,
                message: 'Error al insertar alternativa de la encuesta.',
                error: err.message
            });

        }
    }
}

export const insertSurvey = async (req, res) => {
    const id_user = req.params.idUser
    const {pregunta, alternatives} = req.body
    console.log(pregunta, alternatives)

    try{

        //Guardar pregunta de la encuesta
        const sql_survey = `
            INSERT INTO survey(id_author_survey, question_survey) VALUES (?, ?)

        `
        const [result_survey] = await pool.query(sql_survey, [id_user, pregunta])


        //Guardar alternativas
        for (const alt of alternatives) {
            const sql = 'INSERT INTO alternative(alternative, id_survey) VALUES (?, ?)'
            const [result_alt] = await pool.query(sql, [alt, result_survey.insertId])

        }

        res.json({
            ok: true,
            message: 'Encuesta creada correctamente.',
        });

    } catch (err){
        console.log("error")
        res.status(500).json({
            ok: false,
            message: 'Error al crear la encuesta.',
            error: err.message
        });

    }
}

export const removeSurvey = async (req, res) => {
    const {id_survey} = req.body

    try {
        const sql_survey = `DELETE FROM survey WHERE id_survey = ?`;
        const [result_survey] = await pool.query(sql_survey, [id_survey]);

        res.json({
            ok: true,
            message: 'Encuesta eliminada correctamente.',
        });

    } catch (err) {
        
        res.status(500).json({
            ok: false,
            message: 'Error al eliminar la encuesta.',
            error: err.message
        });
    }
}