const axios = require("axios");
const { Recipe, Diet } = require("../db")

const createRecipe = async(name, image, summary, healthScore, stepByStep, diets)=>{
    const newRecipe = await Recipe.create({name, image, summary, healthScore, stepByStep})
    const getDietsDb = await Diet.findAll({
        where:{
            name: diets
        }
    })
    await newRecipe.addDiets(getDietsDb);
    //console.log(getDietsDb);
    return newRecipe;
}


const getAllRecipes = async()=>{
    const data = (await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=c13fab76c7324d37989f1da785afa1aa&addRecipeInformation=true&number=100")).data
  const allRecipes = data.results.map(result =>{
    return{
        id:result.id,
        name:result.title,
        image:result.image,
        summary:result.summary,
        healthScore:result.healthScore,
        stepByStep:result.analyzedInstructions.map(instruction => {
            return instruction.steps.map(step => {
              return step.step;
            });
        }).flat(),
        diets:result.diets
    }
  })
  return allRecipes;
}

module.exports = {createRecipe, getAllRecipes};

