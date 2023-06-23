import { Link } from "react-router-dom";
import React from "react";
import style from "./Landing.module.css";

export default function Landing() {
  const famousChefQuote = "You are what you eat, so eat well..";
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>
          ¡Welcome to a better life!
          <p className={style.quote}>{famousChefQuote}</p>
        </h1>
        <div>
          <Link to="/home">
            <button className={style.btn}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
