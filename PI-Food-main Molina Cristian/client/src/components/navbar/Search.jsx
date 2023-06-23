import { React } from 'react';
import { paginado, getNamerecipes } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import style from './navSearch.module.css'

export default function Search() {
  const dispatch = useDispatch();


  function handleInputChangue(e) {
    e.preventDefault();
    dispatch(paginado(1));
    dispatch(getNamerecipes(e.target.value));
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