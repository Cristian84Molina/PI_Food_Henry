import React from "react";
import style from "./card.module.css";
import { Link } from 'react-router-dom';


export default function Card({ data }) { // data contiene la informacion de la receta
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); // primera letras de las rectas en mayuscula
  };
  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <div className={style.container}>
          <img src={data.image} alt={data.name} className={style.img} />
          <h3 className={style.font}>{capitalizeFirstLetter(data.name)}</h3>
          <p className={style.font}>
            {Array.isArray(data.diets)
              ? data.diets
                  .map((diet) => {
                    return typeof diet === "object" ? diet.name : diet;
                  })
                  .join(", ")
              : data.diets}
            {console.log(data)}
          </p>

          <h4 className={style.font}>
            <b className={style.font}>HealthScore:</b>
            {data.healthScore}
          </h4>
          <Link to={`/details/${data.id} `} key={data.id} className={style.detail}>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}


