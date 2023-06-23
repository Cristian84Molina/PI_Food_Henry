const axios = require('axios');
const { Diet } = require('../db');
const { API_KEY } = process.env;

module.exports = {
  diet: async () => {
    const lengthdata = await Diet.findByPk(1);
    if (!lengthdata) {
      const dietApi = await axios.get("https://apimocha.com/n.s.recipes/allrecipes"
        /* `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true` */
      );
      const diet = await dietApi.data.results.map((el) => el.diets);
      let data = diet.flat();
      const typeDiet = [...new Set(data)];

      typeDiet.forEach((el) => {
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

