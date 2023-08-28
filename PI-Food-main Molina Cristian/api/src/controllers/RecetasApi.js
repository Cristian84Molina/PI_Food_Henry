const axios = require('axios');
const { Diet } = require('../db');
const { API_KEY } = process.env;

module.exports = {
  diet: async () => {
    const lengthdata = await Diet.findByPk(1); // verifica si ya existen datos en la tabla  
    if (!lengthdata) {
      const dietApi = await axios.get(/* "https://apimocha.com/n.s.recipes/allrecipes" */
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true` 
      );
      const diet = await dietApi.data.results.map((el) => el.diets);
      let data = diet.flat(); // e extraen los tipos de dietas de cada receta y se almacenan en el array
      const typeDiet = [...new Set(data)]; //eliminan los elementos duplicados

      typeDiet.forEach((el) => { // recorre el array y crea los registros en la tabla
        Diet.findOrCreate({
          where: { name: el },
        });
      });
      console.log('Las dietas se han cargado correctamente');
    } else {
      console.log('los datos de dietas ya estan cargados');
    }
  },
};

