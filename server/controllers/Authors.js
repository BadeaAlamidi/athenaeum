import models from '../models/index.js'

const getBookAuthors = async (req,res) =>{
    const authors = await models.Author.findAll({
        attributes: ['author'],
        include: {
            model: models.Book,
            attributes: [],
            through: {
                attributes:[],
            },
            where: {
                id: Number(req.params.bookId)
            }
        },
    }
    );
    res.json(authors);
}

export {getBookAuthors};