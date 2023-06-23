import React from 'react';
import style from './loading.module.css'
const Loading = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.loader}>
          <div className={style.loaderdot}></div>
          <div className={style.loaderdot}></div>
          <div className={style.loaderdot}></div>
          <div className={style.loaderdot}></div>
          <div className={style.loaderdot}></div>
          <div className={style.loaderdot}></div>
          <div className={style.loadertext}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;