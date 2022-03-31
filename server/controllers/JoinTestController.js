import models from '../models/index.js';

export default async (req,res) =>{
    try {
        const result = await models.Book.findAll({
            include: models.Author,
            raw:true
            // as: 'writer'}
            // include: "bookId"
        });
        res.status(200).json(result);
    } catch (e) {
        console.log(e)
    }
}