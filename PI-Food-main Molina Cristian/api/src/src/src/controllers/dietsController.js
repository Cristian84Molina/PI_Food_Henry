const axios = require("axios");
const { Diet } = require("../db")
// require("dotenv").config();
// const {API_KEY} = process.env

const getDiets = async() => {
  const data = (await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=c13fab76c7324d37989f1da785afa1aa&addRecipeInformation=true&number=100")).data
  const diets = data.results.map(result => result.diets).flat()
  const dietObjects = [...new Set(diets)].map(diet => ({ name: diet }))

  //console.log(dietObjects)
  
  const saveDb = await Diet.bulkCreate(dietObjects)
  // console.log(saveDb)

  return dietObjects
}


module.exports = { getDiets }

//getDiets();