

const {createRecipe, getAllRecipes}  = require("../controllers/recipesController")


const handlerRecipe = async(req, res)=>{
    const {name, image, summary, healthScore, stepByStep, diets} = req.body;
    try {
        const newRecipe = await createRecipe(name, image, summary, healthScore, stepByStep, diets);
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
    //console.log(name, image, summary, healthScore, stepByStep, diets);
}

const handlerAllRecipes = async(req, res)=>{
    try {
        const allRecipes = await getAllRecipes();
        //console.log(allRecipes.length);
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
} 
    
    

module.exports = {handlerRecipe, handlerAllRecipes};
