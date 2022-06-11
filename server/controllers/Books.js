// this file was named with the .cjs extension in order to allow the usage of requrie. this can be circumvented by
// not using module.exports in the model file referenced below.
import models from '../models/index.js';
import {Op} from 'sequelize';

const getBooks = async (req,res) =>{
    let books;
    if (req.query){
        let whereClause;
        switch (true){
            case /^isbn10:/.test(req.query.searchString) :
                whereClause = {
                    isbn10:{
                        [Op.eq] : req.query.searchString.slice(7)
                    }
                }
            break;
            case /^isbn13:/.test(req.query.searchString) :
                whereClause = {
                    isbn13:{
                        [Op.eq] : req.query.searchString.slice(7)
                    }
                }
            break;
            // case req.query.searchString === '':
            //     whereClause = {
            //         title:{
            //             [Op.like] : '%'
            //         }
            //     }
            // break;
            default:
                whereClause = {
                    title:{
                        [Op.like] : '%' + req.query.searchString + '%'
                    }
                }
            break;
        }
        // api/books?
        if (req.query.order){
            console.log(req.query);
            // api/books?order
            const columns = ['title','publishDate','rating','pageCount','id'];
            if (!columns.includes(req.query.order)){
                // invalid
                res.status(400).json({status: 'error', reason:'invalid column for find all query'});
                return;
            }
            // api/books?order={valid column}
            let direction = 'ASC';
            if (req.query.direction && req.query.direction ==='DESC'){
                direction = 'DESC';
            }
            books = await models.Book.findAll({
                raw:true,
                order: [[req.query.order,direction]],
                where: whereClause,

            });
        } else {
            // api/books? no  order.
            books = await models.Book.findAll({
                raw:true,
                where: whereClause
            });
        }
    } else {
        // api/books
        books = await models.Book.findAll({raw:true});
    }
    res.json(books);
}
const deleteBook = async (req,res) => {
    console.log("deleting book with id: " + req.body.bookId);
    let wrote = await models.Wrote.destroy({
        where: {
            bookId: req.body.bookId
        }
    }).then(() => {
        console.log("Deleted wrotes entry");
    }).catch((err) => {console.error(error); res.status(500).end();});
    let book = await models.Book.destroy({
        where: {
            id: req.body.bookId
        }
    }).then(() => {
        res.status(204).end();
    }).catch((err) => {console.error(err); res.status(500).end();});
}
export { getBooks, deleteBook};
