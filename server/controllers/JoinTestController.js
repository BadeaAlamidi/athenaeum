import models from '../models/index.js';
import {Op, Sequelize, where} from 'sequelize'

export default async (req,res) =>{
    try {
        // api/taggedbooks?
        if (Object.keys(req.query).length){
            // detect if tags parameter was specified:
            //api/taggedbooks?tags
            console.log(req.query);
            const tagsString = req.query.tags?? null;
            let tagsArray;
            const includeObject = {
                model: models.Tag,
                attributes: ['tagname'],
                through: {attributes:[]}, // specifies the attributes wanted from the through table
            };
            // tags processing: (this causes sequelize to switch from OUTER LEFT JOIN to INNER JOIN)
            if (tagsString){
                tagsArray = tagsString.split(',').map((tag)=>tag.trim())
                                .filter((tag)=>tag.length>0);
                includeObject.where = {
                    tagname: {
                        [Op.in]: tagsArray,
                    }
                };
            } else tagsArray = []
            // order processing:
            const valid_columns = ['title','publishDate','rating','pageCount','id'];
            let order = [['id','ASC']]; // nested array because to comply with sequelize format...
            //api/taggedbooks?order
            if (valid_columns.includes(req.query.order)) order[0][0]=req.query.order;
            //api/taggedbooks?direction
            if (req.query.direction === 'DESC') order[0][1] = 'DESC';

            const result = await models.Book.findAll({
                attributes: ['title', 'id', 'thumbnailUrl'],
                include: includeObject,
                // conditional properties that only get added if a where key is present in includeObjet:
                ...includeObject.where && 
                {group: 'Book.id',
                // having: [Sequelize.literal('count(?)=?'), 'Book.id',tagsArray.length]}
                // aggregate to include only tuples that have all tags
                having: where(Sequelize.fn('COUNT',Sequelize.col('Book.id')), 'group_count',
                 {
                    [Op.eq]: tagsArray.length
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