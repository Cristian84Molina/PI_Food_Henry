const { getDiets } = require ("../controllers/dietsController")


const handlerDiets = async (req, res)=>{
    try {
        const allDiets = await getDiets();
        res.status(200).json(allDiets)    
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

module.exports =  handlerDiets 