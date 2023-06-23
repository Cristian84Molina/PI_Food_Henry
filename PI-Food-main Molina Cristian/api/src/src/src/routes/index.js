const { Router } = require('express');
const  dietsRouter  = require("../routes/dietsRoute")
const recipesRouter = require("../routes/recipesRoute")
         
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/diets", dietsRouter)
router.use("/diets", dietsRouter)
router.use("/recipes", recipesRouter)

module.exports = router;

