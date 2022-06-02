import models from '../models/index.js';

export default async (req,res) =>{
    try {
        const result = await models.Book.findAll({
            attributes: ['title', 'id'],
            include: {
                model: models.Tag,
                attributes: ['tagname'],
                through: {attributes:[]} // specifies the attributes wanted from the through table
            },
            // raw:true
            // as: 'writer'}
            // include: "bookId"
        });
        res.status(200).json(result);
    } catch (e) {
        console.log(e)
    }
}