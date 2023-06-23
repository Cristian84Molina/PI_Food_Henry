const { Router } = require("express");
const  handlerDiets  = require("../handlers/handlerDiets");


const dietsRouter = Router();


dietsRouter.get("/", handlerDiets);

module.exports = dietsRouter;


// const { Router } = require('express');
// const typesHandler = require('../handlers/typesHandler');

// const typesRouter = Router();

// typesRouter.get('/', typesHandler);

// module.exports = typesRouter;
