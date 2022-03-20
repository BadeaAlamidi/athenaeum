// this file was named with the .cjs extension in order to allow the usage of requrie. this can be circumvented by
// not using module.exports in the model file referenced below.
import models from '../models/index.js';

const getBooks = async (req,res) =>{
    try {
        Object.keys(models).forEach((prop)=> console.log(typeof(prop), prop));
        const allEntries = await models.Book.findAll({raw:true});
        res.status(200).json(allEntries);
    } catch(e){
        console.log(e);
    }
}

export default getBooks;