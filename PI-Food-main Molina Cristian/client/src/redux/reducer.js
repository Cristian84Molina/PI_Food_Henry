import {
  GET_ALL_RECIPE,
  ORDER_BY_NAME,
  GET_ALL_DIET,
  ORDER_BY_SCORE,
  PAGINADO,
  RECIPE_DETAILS,
  FILTER_BY_DIET,
  SEARCH_NAME_RECYPE,
  POST_ADD_RECIPES,
  FILTER_DB_OR_API,
  SET_ERROR,
  RESET_DETAILS,
} from "./actions";

const initialState = {
  recipes: [],
  allRecipes: [], //copia de recipes
  diets: [],
  details: [],
  page: 1,
  error: undefined,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE: {
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        page: state.page < action.payload.length ? state.page : 1,
        error: undefined,
      };
    }

    case POST_ADD_RECIPES:
      return {
        ...state,
      };

    case RECIPE_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case SEARCH_NAME_RECYPE: {
      return {
        ...state,
        recipes: action.payload,
        error: undefined,
        page: state.page < action.payload.length ? state.page : 1,
      };
    }
    case FILTER_BY_DIET: {
      const allRecipes = state.allRecipes;
      const selectedDiet = action.payload;

      const recipesFilterDiet =
        selectedDiet === "all"
          ? allRecipes
          : allRecipes.filter((recipe) => {
              const recipeDiets = recipe.diets || []; // Manejo de casos donde diets no está definido
              return recipeDiets.includes(selectedDiet);
            });

      return {
        ...state,
        recipes: recipesFilterDiet,
        page: state.page < recipesFilterDiet.length ? state.page : 1,
      };
    }

    case ORDER_BY_NAME:
      let sortArray =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) {
                return -1;
              } else return 0;
            })
          : /* forma desendente DES */
            state.recipes.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              else return 0;
            });

      return {
        ...state,
        allRecipes: sortArray,
        page: 1,
      };
    case GET_ALL_DIET: {
      return {
        ...state,
        diets: action.payload,
      };
    }
    case ORDER_BY_SCORE: {
      let sortscore =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              else return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return -1;
              if (a.healthScore < b.healthScore) return 1;
              else return 0;
            });

      return {
        ...state,
        allRecipes: sortscore,
        page: 1,
      };
    }
    case PAGINADO: {
      return {
        ...state,
        page: action.payload,
      };
    }
    
    case FILTER_DB_OR_API: {
      const allcreated = state.allRecipes;
      console.log(allcreated);

      let createFilter;

      if (action.payload === "created") {
        createFilter = allcreated.filter((el) => el.createIndb === true);
      } else if (action.payload === "api") {
        createFilter = allcreated.filter(
          (el) => el.createIndb === false || !el.hasOwnProperty("createIndb")
        );
      } else {
        createFilter = allcreated;
      }

      console.log(createFilter);

      return {
        ...state,
        recipes: createFilter,
        page: 1,
      };
    }
    case RESET_DETAILS: {
      return {
        ...state,
        details: [], // Reiniciar el estado details a vacío
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        recipes: [],
        allRecipes: [],
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
