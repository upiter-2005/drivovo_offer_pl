import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./MnuMob.module.scss";
import { closeMobMnu} from "../../redux/slices/carsSlice"
import {useDispatch, useSelector} from "react-redux";

export default function MnuMob() {
  const mobMnu = useSelector(state=>state.cars.mobMnu);
  const dispatch = useDispatch();

  return (
    <nav className={mobMnu ? `${styles.MnuMobile} ${styles.activeMobMnu}` : `${styles.MnuMobile}`}>
      <img src="/img/close.svg" className={styles.close} width={36} alt="" onClick={()=> dispatch(closeMobMnu(false))} />

      <Link to="/" alt="sic volo" className={styles.logo} onClick={()=> dispatch(closeMobMnu(false))}>
          <img src="/img/w-logo.svg" alt="" />
        </Link >

      <ul>
       
      <li><a href="https://drivovo.com/outlet/" className={styles.navLink}>Outlet</a></li>
      <li><a href="https://drivovo.com/beta-test/" className={styles.navLink}>Beta-test</a></li>
        <li>
          <a href="/"  className={styles.navLink} onClick={()=> dispatch(closeMobMnu(false))}>
            Автопарк
          </a>
        </li>
        <li>
          <a href="https://drivovo.com/blog/"  className={styles.navLink} onClick={()=> dispatch(closeMobMnu(false))}>
            Блог
          </a>
        </li>
        <li>
          <a href="https://drivovo.com/questions/"  className={styles.navLink} onClick={()=> dispatch(closeMobMnu(false))}>
            FAQ
          </a>
        </li>
        <li>
          <a href="https://drivovo.com/kontakty/"  className={styles.navLink} onClick={()=> dispatch(closeMobMnu(false))}>
            Контакти
          </a>
        </li>
        



      </ul>
    </nav>
  );
}
