const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();
const model = require("../controllers/ControllerRecipe");
const { Op } = require("sequelize");

/* listar todas las dietas y buscar por name */
router.get("/all", async (req, res) => {
  const name = req.query.name;
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
});

/* --------Busco mis Recetas po Id----------- */

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
          [Op.in]: diets ? diets : [],
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





