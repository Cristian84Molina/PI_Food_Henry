import { React } from 'react';
import { paginado, getNamerecipes } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './navSearch.module.css'
import { useState } from 'react';

export default function Search() {
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);


  function handleInputChangue(e) {
    clearTimeout(timeoutId); // Cancelar el timeout anterior si existe uno
    const value = e.target.value;

    if (value.trim() === '') {
      // Si el campo de búsqueda está vacío, realizar búsqueda de todo
      dispatch(paginado(1));
      dispatch(getNamerecipes(''));
    } else {
      setTimeoutId(
        setTimeout(() => {
          dispatch(paginado(1));
          dispatch(getNamerecipes(value));
        }, 300) // Esperar 500 milisegundos antes de realizar la búsqueda
      );
    }
  }

  return (
    <div>
      <div className={style.container}>
        <div>
          <input
            onChange={handleInputChangue}
            type="text"
            placeholder="Search Recipe"
          />
        </div>
      </div>
    </div>
  );
}