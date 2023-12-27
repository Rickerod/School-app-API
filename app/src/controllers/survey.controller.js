import { pool } from "../db.js";

export const getSurvey = async (req, res) => {
    const user_id = req.params.idUser
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
         
         SELECT al.id_survey, al.id_alternative, ca.cantidad
         FROM cantidad_answers ca
         RIGHT JOIN alternative al ON ca.id_alternative = al.id_alternative
         
        `
        const [surveys] = await pool.query(sql_survey)

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
        WHERE a.id_user = 1
        `

        const [user_survey] = await pool.query(sql_survey_user)

        const result = [];

        surveys.forEach(item => {
            const existingSurvey = result.find(r => r.id_survey === item.id_survey);

            if (existingSurvey) {
                existingSurvey.alternatives.push({
                    id_alternative: item.id_alternative,
                    cantidad: item.cantidad ?? 0
                });
            } else {
                result.push({
                    id_survey: item.id_survey,
                    alternatives: [{
                        id_alternative: item.id_alternative,
                        cantidad: item.cantidad ?? 0
                    }]
                });
            }
        });

        const user_survey_ids = user_survey.map(item => {
            return item.id_survey;
        });


         for (let i = 0; i< result.length; i++) {
            var indice = user_survey_ids.indexOf(result[i].id_survey)
            if(indice !== -1){
                result[i].user_response = user_survey[0].id_alternative
            } else {
                result[i].user_response = 0
            }
        } 

        res.json(result)


    } catch (e) {
        return res.status(500).json({ message: e });
    }
}