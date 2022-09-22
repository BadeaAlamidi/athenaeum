#!/bin/sh
chown node:node db
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
exec "$@"
