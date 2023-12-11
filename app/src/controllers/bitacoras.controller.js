import { pool } from "../db.js";

export const getBitacoras = async (req, res) => {

    try{
        const sql = `SELECT id_bitacora, u.username, u.uri_image_profile, b.name_bitacora
        FROM user u
        INNER JOIN bitacora b ON u.id_user= b.id_user`
        
        const [bitacoras] = await pool.query(sql)

        res.json(bitacoras)

    } catch(e){
        return res.status(500).json({ message: e});
    }
}


export const getQuestions = async (req, res) => {
    const idBitacora = req.params.idBitacora

    try{
        const sql = `SELECT id_question, question
        FROM question
        WHERE id_bitacora = ?`

        const [questions] = await pool.query(sql, [idBitacora])

        res.json(questions)

    }catch(e){
        res.status(500).json({message : e})
    }
}

export const getAnswers = async (req, res) => {
    const idBitacora = req.params.idBitacora

    try{
        const sql = `SELECT q.id_question, q.id_question, q.question, a.id_user, a.answer, u.username, u.uri_image_profile
        FROM question q
        INNER JOIN bitacora b ON b.id_bitacora = q.id_bitacora
        INNER JOIN answer a ON q.id_question = a.id_question
        INNER JOIN user u ON a.id_user = u.id_user
        WHERE b.id_bitacora = ?`

        const [answers] = await pool.query(sql, idBitacora)

        const transformedData = {};

        answers.map((item) => {
            if (!transformedData[item.id_user]) {
              transformedData[item.id_user] = {
                id_user: item.id_user,
                username: item.username,
                uri_image_profile: item.uri_image_profile,
                questions: [],
              };
            }
          
            transformedData[item.id_user].questions.push({
              id_question: item.id_question,
              question: item.question,
              answer: item.answer,
            });

          });

        const finalResultArray = Object.values(transformedData);

        res.json(finalResultArray)

    }catch(e){
        res.status(500).json({message : e})
    }
}


export const insertAnswers = async (req, res) => {
    const id_user = req.params.idUser

    const { answers } = req.body; // [{id_question: 1, "answer": "7"}, {id_question: 2, "answer": "5"}]

    try{
        
        for(const ans of answers) {  

            const sql = 'INSERT INTO answer(answer, id_question, id_user) VALUES (?, ?, ?)'
            const [result] = await pool.query(sql, [ans.answer, ans.id_question, id_user])

        }

        res.json({
            ok: true,
            message: 'Respuestas ingresadas correctamente!',
        });
        
    }catch(e){
        res.status(500).json({message : e})
    }
}

export const uploadBitacora = async (req, res) => {
    const { titulo } = req.body

}