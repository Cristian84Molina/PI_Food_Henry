const { Router } = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const Alldiet = await Diet.findAll(); //devuelve todas las dietas almacenadas en la base de datos
    res.status(200).send(Alldiet);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

