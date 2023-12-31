import React from "react";
import { useDispatch } from "react-redux";
import {
  filterBydiet,
  orderByaz,
  orderByscore,
  filtercreated,
} from "../../redux/actions";
import style from "./filtros.module.css";

export default function Filtros({ diet, setorder, setscore }) {
  const dispatch = useDispatch();

  function handleOderByname(e) { // ordenar las recetas por nombre
    dispatch(orderByaz(e.target.value));
    setorder(e.target.value);
  }

  function handleOrderScore(e) { // ordenar las recetas por puntaje
    dispatch(orderByscore(e.target.value));
    setscore(e.target.value);
  }

  function handleFilterDiets(e) { //filtrar las recetas por tipo de dieta
    dispatch(filterBydiet(e.target.value));
  }

  function handleFilterCreated(e) {  //filtrar las recetas por origen 
    dispatch(filtercreated(e.target.value));
  }

  
  function handleClick(e) { // se ejecuta cuando reseteamos la pagina
    /*  dispatch(getAllrecipes()); */ // actualiza el estado de la aplicación sin recargar completamente la página
    window.location.reload(false); // recarga completamente la página y reinicia la aplicación desde el servidor
  }

  return (
    <div className={style.container}>
      <button className={style.buton} onClick={handleClick}>
        Reset Filter
      </button>
      {/*-------------All dietas al select------------ */}
      <div className={style.selectContainer}>
      
        DIETS <br />
        <select onChange={handleFilterDiets} name="diet" id="diet">
          <option value="defauls" disabled>
            seleccione..
          </option>
          <option value="all" defaultValue>
            All
          </option>
          {diet?.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>
      </div>

      {/* ------------Ordenar de a-z z-a------------ */}
      <div className={style.selectContainer}>
        A-z / Z-a <br />
        <select onChange={handleOderByname} name="orderaz" id="orderaz">
          <option value="defauls" disabled>
            seleccione..
          </option>
          <option value="asc">A-z</option>
          <option value="des">Z-A</option>
        </select>
      </div>

      {/* Filtrar por puntaje Score */}
      <div className={style.selectContainer}>
        SCORE <br />
        <select onChange={handleOrderScore} name="score" id="score">
          <option value="defauls" disabled>
            seleccione..
          </option>
          <option value="asc">Lower</option>
          <option value="des">Higher</option>
        </select>
      </div>

      {/* filtrar los de la base de dtaos y de la Api */}
      <div className={style.selectContainer}>
        BD / API <br />
        <select name="ifoapidb" onChange={handleFilterCreated}>
          <option value="all" defaultValue>
            All
          </option>
          <option value="api">Api</option>
          <option value="created">Created</option>
        </select>
      </div>
    </div>
  );
}
