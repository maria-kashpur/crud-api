# crud-api

# Routes
GET       /api/users
POST      /api/users
GET       /api/users/:id
PUT       /api/users/:id
DELETE    /api/users/:id


Scripts: 
"start:dev": "NODE_NO_WARNINGS=1 nodemon",
"start:prod": "webpack --mode production && node ./dist/index.js",
"start:dev:multi": "nodemon --multi",
"start:prod:multi": "webpack --mode production && cross-env CRUD_API_MODE=cluster node ./dist/index.js"
