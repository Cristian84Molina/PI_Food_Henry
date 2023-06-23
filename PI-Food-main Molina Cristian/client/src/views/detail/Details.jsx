import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipesDetils, resetDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from './Details.module.css'
import Loading from "../../components/loading/Loading";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [loading, setLoading] = useState(true); // Variable de estado para controlar la carga de los detalles
  let data = useSelector((state) => state.details);

  useEffect(() => {
    // Limpia el estado details antes de cargar los nuevos datos
    dispatch(resetDetails());
    setLoading(true); // Establece la variable de carga en true al iniciar la carga de detalles
    dispatch(recipesDetils(id))
      .then(() => {
        setLoading(false); // Establece la variable de carga en false cuando los detalles se hayan cargado correctamente
      })
      .catch((error) => {
        setLoading(false); // Establece la variable de carga en false si hay un error en la carga de detalles
        console.log(error);
      });
  }, [dispatch, id]);

  return (
    <div >
      {loading ? ( // Mostrar el componente Loading si la variable de carga está en true
        <Loading />
      ) : (
        data.map((el) => (
          <div className={style.detalle} key={el.id}>
            <div className={style.detalle__left}>
              <div className={style.detalle_name}>
                <Link to="/home">
                  <div className={style.d__back}>
                    <p >
                    {'<<---'}
                    </p>
                  </div>
                </Link>
                <h1 className={style.font}>{capitalizeFirstLetter(el.name)}</h1>
                <img
                  className={style.d_imagen}
                  src={el.image}
                  alt=" Not Fount"
                />
                <span>
                  <p >HealthScore: {el.healthScore}</p>
                </span>

                <div className={style.d__diets}>
                  <p>
                    Diets:{" "}
                    {Array.isArray(el.diets)
                      ? el.diets
                          .map((diet) =>
                            typeof diet === "object" ? diet.name : diet
                          )
                          .join(", ")
                      : el.diets}
                  </p>
                </div>
              </div>
            </div>
            {/* Sumary - Step by Step */}
            <div className={style.detalle__right}>
              <div className={style.d__desc}>
                <p className={style.font2}>Summary:<br/></p>
                <p dangerouslySetInnerHTML={{ __html: el.summary }} />
                <br />
              </div>
              <div className={style.d__pasos}>
                <p className={style.font2}>Step by Step:</p>
                {Array.isArray(el.stepByStep) ? (
                  el.stepByStep.map((step, index) => <p key={index}>{step}</p>)
                ) : (
                  <p>{el.stepByStep}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
