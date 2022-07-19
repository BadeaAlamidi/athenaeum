import models from '../models/index.js';
import {Op, Sequelize, where} from 'sequelize'

//Queries the database to return books AND their associated tags using the through-table: attributes
//if req.query is certain to have parameters, and one of those parameters is tags, then the db
//is queried to return books that contain all of the specified tags.
//this process is duplicated for authors in order to get books with select tags that also have
//select authors.
//req.query may (but is not guaranteed to) contain additional params for results order & direction 
//
//returns an array of json elements
export default async (req,res) =>{
    try {
        // api/taggedbooks?
        if (Object.keys(req.query).length){
            // detect if tags parameter was specified:
            //api/taggedbooks?tags
            console.log(req.query);
            const tagsString = req.query.tags || undefined;
            const authorString = req.query.authors || undefined;
            //api/taggedbooks?authors
            //this variable could be of type undefined | [...]
            const authorArray = authorString?.split(',')
                                    .map((author)=>author.trim())
                                    .filter((author)=>author.length>0)
                                || [];
            const tagsArray = tagsString?.split(',')
                                    .map((tag)=>tag.trim())
                                    .filter((tag)=>tag.length>0)
                                || [];
            const reqHasAuthors = authorArray.length > 0;
            const reqHasTags = tagsArray.length > 0;
            const authIncludeObject ={
                model: models.Author,
                attributes : ['author'],
                through : {attributes:[]},
                ...reqHasAuthors && {where:{author: {[Op.in]:authorArray}}}
            }
            const tagsIncludeObject = {
                model: models.Tag,
                attributes: ['tagname'],
                through: {attributes:[]}, // specifies the attributes wanted from the through table
                ...reqHasTags && {where:{tagname: {[Op.in]: tagsArray,}}}
            };
            // order processing:
            const valid_columns = ['title','publishDate','rating','pageCount','id'];
            let order = [['id','ASC']]; // nested array to comply with sequalize format...
            //api/taggedbooks?order
            if (valid_columns.includes(req.query.order)) order[0][0]=req.query.order;
            //api/taggedbooks?direction
            if (req.query.direction === 'DESC') order[0][1] = 'DESC';
            // the count parameter is determined as such:
            //      the query will return the same book for each author
            //      if we treat the repeats of each book and its authors as one result,
            //      we will see that this 'one result' (which, again, is composed of repeats
            //      of the same book for each author) is repeated for each tag the book has.
            //      With this in mind, the number of times the same book should appear is 
            //      #ofAuthors * #ofTags with each of these values requiring a default of 1
            //
            // There should be no overlap between the author query count and tag query count.
            //      that is, while 2x3 does equal 3x2, we must remember that this query only
            //      results in the specified values from the IN clauses, eliminating any false
            //      positives that one might think could be returned. While this is not thoroughly
            //   tested, it has been passing all of the test cases that i've been running in my head
            const aggregatCountParameter = 
                    (reqHasTags? tagsArray.length : 1) * (reqHasAuthors?authorArray.length:1);

            // for the aggregatCountParameter to always be correct, the includeObjects must be 
            //      applied conditionally to the findAll method below. This is because the objects
            //      may or may not have the 'where' key on them. without a where clause, the query
            //      will return all of the authors/tags associated with a book and this is not how
            //      the aggregatCountParameter variable handles the absence of either of these
            //      i.e: if tags were not specified, the default value would be the number of tags
            //  in said book rather than'1'. Finding the # of tags would require unnecessary queries
            const includeArray = [];
            if (reqHasAuthors) includeArray.push(authIncludeObject);
            if (reqHasTags) includeArray.push(tagsIncludeObject);

            const result = await models.Book.findAll({
                attributes: ['title', 'id', 'thumbnailUrl'],
                include: includeArray,
                // conditional properties that only get added if a where key is present in
                // either authIncludeObjet OR tagsIncludeObject:
                // which is only added if tags were found after sanitization
                ...(reqHasTags || reqHasAuthors) && 
                {group: 'Book.id',
                // having: [Sequelize.literal('count(?)=?'), 'Book.id',tagsArray.length]}
                // aggregate to include only tuples that have all tags
                having: where(Sequelize.fn('COUNT',Sequelize.col('Book.id')), 'group_count',
                 {
                    [Op.eq]: aggregatCountParameter
                 })},
                order,

            });
            res.status(200).json(result);
        } 
        // api/taggedbooks
        else {
            const result = await models.Book.findAll({
                attributes: ['title', 'id', 'thumbnailUrl'],
                include: {
                    model: models.Tag,
                    attributes: ['tagname'],
                    through: {attributes:[]}, // specifies the attributes wanted from the through table
                },
                // raw:true
                // as: 'writer'}
                // include: "bookId"
            });
            res.status(200).json(result);
        }
    } catch (e) {
        console.log(e)
    }
}