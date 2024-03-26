import React from 'react'
import styles from "./Preloader.module.scss"

export default function Preloader() {
  return (
    <div className={styles.preloader}>
        <img src="/img/preloader.gif" alt="" />
    </div>
  )
}
