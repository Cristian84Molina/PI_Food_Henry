const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db');

/* Obtengo  las recetas de la Api */
const getApiInfo = async () => {
  const data = (await axios.get("https://apimocha.com/n.s.recipes/allrecipes"
    /* `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true` */)).data
  const allRecipes = data.results.map(result =>{ // mapeamos results para obtener los atributos 
    return{
        id:result.id,
        name:result.title.toLowerCase(),
        image:result.image,
        summary:result.summary,
        healthScore:result.healthScore,
        stepByStep:result.analyzedInstructions.map(instruction => {
            return instruction.steps.map(step => {
              return step.step;
            });
        }).flat(),
        diets:result.diets.length ? result.diets : "No associeted diets" 
    }
  })
  return allRecipes;
};

/* Obtengo los Datos de la base de Datos */
const getDbinfo = async () => {
  const allDb = await Recipe.findAll({
    include: {
      model: Diet,
      atrributes: ['name'],
      through: {
        atrributes: [],
      },
    },
  });
  return allDb
};

/* Combino la infromacion de la App y la de la DB */
const getAllRecipes = async (filter) => {
  const apiData = await getApiInfo();
  const dbData = await getDbinfo();

  let combinedData = [...apiData, ...dbData];
  
  // Dependiendo del filtro proporcionado como argumento, se devuelve el array completo o solo la información de la API o de la base de datos.
  if (filter === "api") {   
    combinedData = apiData;
  } else if (filter === "created") {
    combinedData = dbData;
  }

  return combinedData;
};



module.exports = {
  getDbinfo,
  getApiInfo,
  getAllRecipes
};

