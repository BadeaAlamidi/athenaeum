'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join, dirname } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// const config = (await import(/*__dirname + '/*/'../config/config.json'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelFiles = readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  });
  //.forEach(file => {
  //  const model = (await import(join(__dirname, file)))(sequelize, DataTypes);
  //  db[model.name] = model;
  //});

export default await (async function importModels(){
    for (const file of modelFiles){
      
      // const module = await import('file://' + join(__dirname, file));
      // const model = module.default(sequelize, DataTypes);
      const {default : modelImport} = await import('file://' + join(__dirname, file))
      const model = modelImport(sequelize, DataTypes);
      db[model.name] = model;
    }
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
      else {console.log('associate method was not found ')}
    });
    db.sequelize = sequelize;
    return db;
})()



// export default db;