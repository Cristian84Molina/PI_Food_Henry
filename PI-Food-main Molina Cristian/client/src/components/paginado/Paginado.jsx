import React from 'react';
import { paginado } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './Paginado.module.css'


export default function Paginado({
  tamañoRecipe,
  tamañoPorpagina,
  pageactual,
}) {
  const dispach = useDispatch();
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(tamañoRecipe / tamañoPorpagina); i++) {
    pageNumbers.push(i + 1);
  }

  function handelClickpage(numero) {
    dispach(paginado(numero));
  }

  /* next */
  function handleClickNext() {
    if (pageactual < pageNumbers.length) {
      dispach(paginado(pageactual + 1));
    } else {
      alert('there are no more pages');
    }
  }
  function handleClickPreview() {
    if (pageactual > 1) {
      dispach(paginado(pageactual - 1));
    } else {
      alert('there are no more pages');
    }
  }

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handleClickPreview}>
      {"<<"}
      </button>
      {pageNumbers.map((page) => {
        return (
          <button
            className={page === pageactual ? style.active_button  : style.button}
            key={page}
            onClick={() => handelClickpage(page)}
          >
            {page}
          </button>
        );
      })}
      <button className={style.button} onClick={handleClickNext}>
      {">>"}
      </button>
    </div>
  );
}


