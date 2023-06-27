import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllrecipes, getAllDiet } from "../../redux/actions";
import Filtros from "../../components/filter/Filtros";
import Card from "../../components/card/Card";
import Paginado from "../../components/paginado/Paginado";
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import style from "./Home.module.css";

const Home = () => {
  const recipe = useSelector((state) => state.recipes);
  const page = useSelector((state) => state.page);
  const error = useSelector((state) => state.error);
  const allDiet = useSelector((state) => state.diets);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllrecipes());
    dispatch(getAllDiet());
  }, [dispatch]);

  const [order, setOrder] = useState(""); //Guarda el ordenamiento por name
  const [score, setScore] = useState(""); // guarda el puntaje


  /*----------------- Paginado Nuevo----------------- */
  let currenRecipes = [];
  const tamañoRecipe = recipe.length;
  const tamañoPorpagina = 9;
  let indexFinal = tamañoPorpagina * page; // 9 pagina
  let inicial = indexFinal - tamañoPorpagina; // 9-9=0
  currenRecipes = recipe.slice(inicial, indexFinal);

  return (
    <div className={style.homeContainer}>
      {/* -------------------Navbar------------------- */}
      <Navbar />

      {/* ------------Filtros----------*/}

      <div className="filter_paginate">
        <div className="filtros">
          {<Filtros diet={allDiet} setorder={setOrder} setscore={setScore} />}
        </div>
        <div className="paginate">
          {/* --------------Paginado-------------- */}
          <Paginado
            tamañoRecipe={tamañoRecipe}
            tamañoPorpagina={tamañoPorpagina}
            pageactual={page}
          />
        </div>
      </div>

      {/* ----------Card ----------*/}
      {error ? (
        <Error />
      ) : currenRecipes.length === 0 ? (
        <Loading />
      ) : (
        <div className={style.gallary_image_box}>
          {currenRecipes?.map((recipe) => (
            <Card data={recipe} key={recipe.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
