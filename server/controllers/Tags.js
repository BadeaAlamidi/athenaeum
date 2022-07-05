import models from '../models/index.js'

const getTags = async (req, res)=>{
    const tags = await models.Tag.findAll(
        {
            attributes:['tagname']
        }
    );
    res.json( tags);
}

export {getTags,}