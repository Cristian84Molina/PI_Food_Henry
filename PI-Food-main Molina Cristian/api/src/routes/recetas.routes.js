const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();
const model = require("../controllers/ControllerRecipe");
const { Op } = require("sequelize");

/* buscar por name */
/* router.get("/all", async (req, res) => {
  const name = req.query.name; // obtenemos el nombre por query
  let recipeTotal = await model.getAllRecipes();
  if (name) {
    let recipeName = await recipeTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toString().toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res
          .status(404)
          .send(
            "No existe Receta que contenga ese Nombre: " + name.toLowerCase()
          );
  } else {
    res.status(200).send(recipeTotal);
  }
}); */
router.get("/all", async (req, res) => {
  try {
    const { name } = req.query; // Obtenemos el nombre por query
    const recipeTotal = await model.getAllRecipes(); // Obtiene todas las recetas de la API externa y de la base de datos

    if (name) {
      const recipeName = recipeTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      if (recipeName.length > 0) {
        res.status(200).send(recipeName);
      } else {
        res.status(404).send("No existe una receta que contenga ese nombre: " + name.toLowerCase());
      }
    } else {
      res.status(200).send(recipeTotal);
    }
  } catch (error) {
    res.status(500).send("Ocurrió un error en el servidor");
  }
});


/* Busco mis Recetas po Id */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let recipeTotal = await model.getAllRecipes();
  /* const recipeTotal = await Recipe.findByPk(id); */
  /* res.status(200).send(recipeTotal); */
  if (id) {
    let recipeId = await recipeTotal.filter((el) => el.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("No se Encontro Receta con el id: " + id);
  }
});

/*-------Agrega un Receta y tipos de Dietas------*/
router.post("/", async (req, res) => {
  
  const { name, summary, healthScore, stepByStep, image, createIndb, diets } =
    req.body;
    console.log(req.body, '');
  try {
    if (!name || !summary)
      return res.status(404).send("Creacion Cancelada. Falto Informacion");

    const newRecipe = await Recipe.create({
      name: name.toLowerCase(),
      image,
      summary,
      stepByStep,
      healthScore,
      createIndb,
    });

    const dietsToAdd = await Diet.findAll({
      where: {
        name: {
          [Op.in]: diets ? diets : [], // Se utiliza el operador Op.in de Sequelize para buscar las dietas cuyos nombres estén incluidos en el arreglo
        },
      },
    });

    await newRecipe.addDiets(dietsToAdd);

    return res.json(newRecipe);
  } catch (err) {
    return res.status(404).json(err);
  }
});

module.exports = router;





