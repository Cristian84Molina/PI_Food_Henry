import React from 'react';
import style from './error.module.css'

export default function Error() {
  return (
    <div className={style.error}>
      <h2>RECIPE NOT FOUND</h2>
    </div>
  );
}