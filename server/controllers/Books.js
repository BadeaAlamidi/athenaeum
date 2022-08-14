// this file was named with the .cjs extension in order to allow the usage of requrie. this can be circumvented by
// not using module.exports in the model file referenced below.
import models from '../models/index.js';
import {Op} from 'sequelize';
import busboy from 'busboy';
 // For file writes
import path from 'path';
import fs from 'fs';

// Queries the database to find books whose titles are similar
//      to the provided req.query.searchString (or equivalent in case the
//      searchString starts with isbn10/isbn13)
//      req.query may (but is not guaranteed to) also contain information
//      on how the results of the query should be sorted and/or ordered
//
//      returns an array of json elements
const getBooks = async (req,res) =>{
    let books;
    if (Object.keys(req.query).length){
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
    let tagmappings = await models.Tagmapping.destroy({
        where: {
            bookId: req.body.bookId
        }
    }).then(() => {
        console.log("Deleted tagmapping entry");
    }).catch((err) => {
        console.error("Error deleting tagmapping entry");
        console.error(error);
        res.status(500).end();
    });
    let wrote = await models.Wrote.destroy({
        where: {
            bookId: req.body.bookId
        }
    }).then(() => {
        console.log("Deleted wrotes entry");
    }).catch((err) => {console.error(err); res.status(500).end();});
    let book = await models.Book.destroy({
        where: {
            id: req.body.bookId
        }
    }).then(() => {
        res.status(204).end();
    }).catch((err) => {console.error(err); res.status(500).end();});
}

// queries the database for a single book through provided id
// returns a json representing the book tuple
const getBook = async (req,res)=>{
    // findAll is used instead of findByPk because the book table has a date column in the model
    // definition which is not a supported type in sqlite. this is circumvented with
    // findAll with the raw:true option for the time being
    const book = await models.Book.findAll({raw:true, where:{id:{[Op.eq]:req.params.id}}})
    res.json(book);
}

// Constructs a new book object to be given to Sequelize
function Book(isbn10, isbn13, subtitle, rating, maturityRating, language, publishDate, pageCount, description, author, title) {
    this.isbn10 = isbn10,
    this.isbn13 = isbn13,
    this.subtitle = subtitle,
    this.rating = rating,
    this.maturityRating = maturityRating,
    this.language = language,
    this.publishDate = publishDate,
    this.pageCount = pageCount,
    this.description = description,
    this.author = author,
    this.title = title
}

const getRelativeImageUrl = (fsPath) => {
    return "/images/" + fsPath;
}

const addBook = async (req,res) => {
    console.log("Adding a book");
    console.log("request: ");
    console.log(req);
    let responseCode = 200;
    // requestInputvalues is responsible for holding all the values of the
    // field inputs except for the file uploads.
    let requestInputValues = [];
    let newBookObj = {};
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        );
        file.on('data', (data) => {
            if (filename !== undefined)
                console.log(`File [${name}] got ${data.length} bytes`);
        }).on('close', () => {
            if (filename !== undefined)
                console.log(`File [${name}] done`);
        });
        if (filename !== undefined) {
            const saveTo = path.join("uploads/images", `${filename}`);
            file.pipe(fs.createWriteStream(saveTo));
            console.log("URL: " + getRelativeImageUrl(filename));
            if (name === "thumbnailUrl")
                newBookObj.thumbnailUrl = getRelativeImageUrl(filename);
            else if (name === "smallThumbnailUrl")
                newBookObj.smallThumbnailUrl = getRelativeImageUrl(filename);
        } else if (filename === undefined) {
            newBookObj.thumbnailUrl = getRelativeImageUrl("no-cover.svg");
            newBookObj.smallThumbnailUrl = getRelativeImageUrl("no-cover.svg");
        }
    });
    bb.on('field', (name, val, info) => {
        // console.log(`Field [${name}]: value: %j`, val);
        if (val != "" || val !== undefined) {
            console.log(`${name} has a value of %j`, val);
            // requestInputvalues is responsible for holding all the values of the
            // field inputs except for the file uploads.
            // The spread operator is then used to assign all the values of the
            // array to each argument of the Book function.
            //
            // Since newBookObj already has the thumbnailurl and smallthumbnailurl
            // properties, assigning the book object that the Book function returns would remove
            // the properties. That's what tempBookObj is for.
            // It holds these properties and reassigns them to the object returned by the "Book" function.
            requestInputValues[requestInputValues.length] = val;
            let tempBookObj = newBookObj;
            newBookObj = new Book(...requestInputValues);
            newBookObj.thumbnailUrl = tempBookObj.thumbnailUrl;
            newBookObj.smallThumbnailUrl = tempBookObj.smallThumbnailUrl;
        }
        else
            responseCode = 400; // bad request
    });
    bb.on('close', async () => {
        console.log("Closed");
        res.writeHead(responseCode, {Connection: 'close'});
        res.status(responseCode).end()
        console.log("Book Object: %j", newBookObj);
        newBookObj.rating = parseInt(newBookObj.rating);
        newBookObj.pageCount = parseInt(newBookObj.pageCount);
        newBookObj.publishDate = new Date(newBookObj.publishDate);
        let newAuthor;
        let newBook;
        let newWrotes;
        let authorExists = await models.Author.findOne({where: {author: newBookObj.author}});
        if (authorExists !== null) {
            newBook = await models.Book.create(newBookObj);
            newWrotes = await models.Wrote.create({bookId: newBook.id, writerId: authorExists.id});
        } else {
            newAuthor = await models.Author.create({author: newBookObj.author});
            newBook = await models.Book.create(newBookObj);
        }

    });

    req.pipe(bb);
}

export { getBooks, getBook, deleteBook, addBook};
