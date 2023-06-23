import axios from "axios";

export const GET_ALL_RECIPE = 'GET_ALL_RECIPE';
export const SEARCH_NAME_RECYPE = 'SEARCH_NAME_RECYPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_ALL_DIET = 'GET_ALL_DIET';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const PAGINADO = 'PAGINADO';
export const RECIPE_DETAILS = 'RECIPE_DETAILS';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const POST_ADD_RECIPES = 'POST_ADD_RECIPES';
export const FILTER_DB_OR_API = 'FILTER_DB_OR_API';
export const SET_ERROR = 'SET_ERROR';
export const RESET_DETAILS = 'RESET_DETAILS';


/* TODAS LAS RECIPES */
export const getAllrecipes = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get('/recipes/all');
        return dispatch({ type: GET_ALL_RECIPE, payload: json.data });
      } catch (error) {
        console.log(error);
      }
    };
  };
  


 /* CREAR RECETA*/
  export function postAddRecipes(payload) {
    return async function (dispatch) {
      let response = await axios.post("http://localhost:3001/recipes/", payload)
      return dispatch({
            type: POST_ADD_RECIPES,
            payload: response, 
          })
        }
  }
  
  /*TODAS LAS  DIETAS */
  export function getAllDiet() {
    return async function (dispatch) {
      try {
        var dietas = await axios.get('/diet');
        return dispatch({
          type: GET_ALL_DIET,
          payload: dietas.data,
        });
      } catch (error) {
        console.log('No se Han podido cargar las dietas');
      }
    };
  }
  
  /* BUSCAR LAS RECIPES POR NOMBRE */
  export const getNamerecipes = (name) => {
    return async function (dispatch) {
      try {
        let json = await axios.get('recipes/all?name=' + name);
        return dispatch({
          type: SEARCH_NAME_RECYPE,
          payload: json.data,
        });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err });
      }
    };
  };
  
  /* BUSCAR RECIPE POR ID */
  export const recipesDetils = (id) => {
    return async function (dispatch) {
      let json = await axios.get('recipes/' + id);
      return dispatch({
        type: RECIPE_DETAILS,
        payload: json.data,
      });
    };
  };
  
  /*FILTRAR POR DIETS */
  
  export function filterBydiet(diet) {
    return {
      type: FILTER_BY_DIET,
      payload: diet,
    };
  }
  
  /*   ORDENAR a-z,z-a*/
  export function orderByaz(order) {
    return {
      type: ORDER_BY_NAME,
      payload: order,
    };
  }
  
  /* ORDER POR PUNTUACION SCORE */
  export function orderByscore(score) {
    return {
      type: ORDER_BY_SCORE,
      payload: score,
    };
  }
  
  /* PAGINADO */
  
  export function paginado(numero) {
    return (dispatch) => {
      dispatch({ type: PAGINADO, payload: numero });
    };
  }
  
  /* FILTRAR LOS DE LA PAGINA Y LOS DE LA API */
  export function filtercreated(data) {
    return {
      type: FILTER_DB_OR_API,
      payload: data,
    };
  }
  

  /* RINICIAR LOS DETAILS */
export const resetDetails = () => {
  return {
    type: RESET_DETAILS,
  };
};
  



