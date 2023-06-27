import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiet, postAddRecipes } from '../../redux/actions';
import { Link, useHistory } from 'react-router-dom';
import style from './Recipes.module.css';

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Recipe name is required';
  } else if (!input.summary) {
    errors.summary = 'Summary is required';
  } else if (!input.healthScore) {
    errors.healthScore = 'Health score is required';
  } else if (!input.diets.length) {
    errors.diets = 'Select at least one diet';
  }
  return errors;
}

export default function Recipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getAllDiet());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: '',
    stepByStep: '',
    image: '',
    diets: [],
    createIndb: true,
  });

  const [errors, setErrors] = useState({});

  function inputHandleChange(e) { // Mmanejar los cambios en los campos de entrada del formulario
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  function rangeHandleChange(e) { // manejar los cambios en el campo de rango de puntuación
    const newInputRange = {
      ...input,
      healthScore: e.target.value,
    };
    setInput(newInputRange);
    setErrors(validate(newInputRange));
  }

  function selectHandleDiet(e) { // manejar la selección de dietas en el campo de selección
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          diets: [...input.diets, e.target.value],
        })
      );
    }
    e.target.value = '';
  }

  function handleStep(e) {
    setInput({
      ...input,
      stepByStep: [e.target.value],
    });
  }

  function handleSubmit(e) { // envia el formulario y llama a /post
    e.preventDefault();
    dispatch(postAddRecipes(input));
    setInput({
      name: '',
      summary: '',
      healthScore: 1,
      stepByStep: '',
      image: '',
      diets: [],
      createIndb: true,
    });
    history.push('/home');
    alert('Recipe created successfully')
  }

  function handleDelete(el) { //elimina la dieta del estado de la nueva receta
    const newInput = {
      ...input,
      diets: input.diets.filter((d) => d !== el),
    };
    setInput(newInput);
    setErrors(validate(newInput));
  }

  return (
    <>
      <div className={style.container}>
        <br />
        <Link to="/home">
          <div className={style.d__back}>
            <p>{'<<---'}</p>
          </div>
        </Link>

        <div className={style.conatiner__main}>
          

          <div>
  
            <div className={style.forms__info}>
              <h1>New Recipe</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className={errors.name && style.danger}
                    type="text"
                    placeholder="Agregar un nombre de Receta:"
                    onChange={inputHandleChange}
                    name="name"
                    value={input.name}
                  />
                </div>
                {errors.name && <p className={style.danger}>{errors.name}</p>}

                <div>
                  <textarea
                    name="summary"
                    cols="40"
                    rows="3"
                    value={input.summary}
                    onChange={inputHandleChange}
                    placeholder="Ingrese una Descripción de la Receta"
                  />
                </div>
                {errors.summary && <p className={style.danger}>{errors.summary}</p>}

                <div className={style.score}>
                  <span>{input.healthScore}</span>
                  <input
                    type="range"
                    name="healthScore"
                    min="1"
                    max="100"
                    value={input.healthScore}
                    onChange={rangeHandleChange}
                  />
                </div>
                {errors.healthScore && <p className={style.danger}>{errors.healthScore}</p>}

                <div >
                  <textarea
                    name="stepbyStep"
                    cols="40"
                    rows="3"
                    value={input.stepByStep}
                    placeholder="Ingrese los pasos para crear la receta"
                    onChange={handleStep}
                  />
                </div>

                <div >
                  <input
                    type="text"
                    name="image"
                    placeholder="ruta imagen"
                    value={input.image}
                    onChange={inputHandleChange}
                  />
                </div>

                <div>
                  <select name="diet" onChange={(e) => selectHandleDiet(e)}>
                    {diets?.map((el) => (
                      <option key={el.id} value={el.name}>{el.name}</option>
                    ))}
                  </select>

                  <ul>
                    <div className={style.diet}>
                      {input.diets.map((el) => (
                        <div className={style.chip} key={el.id}>
                          <li>{el}</li>
                          <span className={style.buton__x} onClick={() => handleDelete(el)}>
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
                {errors.diets && <p className={style.danger}>{errors.diets}</p>}
                {!input.name || !input.summary || !input.diets.length  ? (
                  <div className={style.boton_add}>
                    <input
                      type="submit"
                      value=" Add Recipe"
                      className={style.boton__inactivo}
                      disabled
                    />
                  </div>
                ) : (
                  <div className={style.boton__new}>
                    <input
                      type="submit"
                      value=" Add Recipe"
                      className={style.boton}
                    />
                  </div>
                )}
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

