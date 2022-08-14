import models from '../models/index.js'

const getBookAuthors = async (req,res) =>{
    //TODO: sanitize req.params.bookId 
    const bookId = Number(req.params.bookId) || 1;
    const authors = await models.Author.findAll({
        attributes: ['author'],
        include: {
            model: models.Book,
            attributes: [],
            through: {
                attributes:[],
            },
            where: {
                id: bookId
            }
        },
    }
    );
    console.log("TEST");
    console.log(authors);
    res.json(authors);
}
const getAllAuthors = async(req,res) =>{
    res.json(
        await models.Author.findAll({
            attributes: ['author']
        })
    );
}

export {getBookAuthors, getAllAuthors};
