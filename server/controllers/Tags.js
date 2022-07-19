import models from '../models/index.js'

//Returns all of the tags from the tags table in the database

const getAllTags = async (req, res)=>{
    const tags = await models.Tag.findAll(
        {
            attributes:['tagname']
        }
    );
    res.json( tags);
}

//Returns the tags associated with a specific book from the 
//      books table

const getBookTags = async (req,res)=>{
    const bookTags = await models.Tag.findAll({
        attributes:['tagname'],
        include:{
            model: models.Book,
            attributes: [],
            through: {attributes : []},
            where : {
                id: Number(req.params.bookId)
            }
        }
    });
    res.json(bookTags);
}

export {getAllTags, getBookTags}