import React from 'react'
import styles from "./Car.module.scss"
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars, setBg, hidePreloader, showPreloader } from "../../redux/slices/carsSlice";
import {Link} from "react-router-dom";
import SkeletonImage from "../../Components/SkeletonImage";


export default function Car({ ...obj }) {
    const cars = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();
    const [changedCar, setChangedCar] = useState(null);

    // useEffect(() => {
    //     //window.scrollTo({ top: 0, behavior: "smooth" });
    //     dispatch(getCars());
    //    //widthDetect();
    // //     let iframe = document.getElementById('bdsFrame');
    // // let style = document.createElement('style');
    // // style.textContent =
    // //   '.some-class-name {' +
    // //   '  some-style-name: some-value;' +
    // //   '}' 
    // // ;
    // // iframe.contentDocument.head.appendChild(style);
    //   }, []);

//  useEffect(() => {
//     const currentCar = cars?.find((obj) => obj.id === id);
//     console.log(currentCar);
//     setChangedCar(currentCar);
//     //setImages(currentCar?.properties.Photo.files);
    
//     if(currentCar){
//       setTimeout(()=>{dispatch(hidePreloader());}, 3000)
      
//     }
//   }, [cars]);


  return (

    
    <div className={styles.carItem}>
        {obj?.properties.label_status?.select?.name === "Доступно" &&    <div className={`${styles.label} ${styles.aval}`}>Доступно</div>}
        {obj?.properties.label_status?.select?.name === "Під замовлення" &&    <div className={`${styles.label} ${styles.zakaz}`}>Під замовлення</div>}
        {obj?.properties.label_status?.select?.name === "Очікуємо" &&    <div className={`${styles.label} ${styles.waiting}`}>Очікуємо</div>}
        {obj?.properties.label_status?.select?.name === "Останнє авто" &&    <div className={`${styles.label} ${styles.lastAvto}`}>Останнє авто</div>}

        {!obj?.properties.Cover.files[0]?.file.url
         ? 
         (<SkeletonImage />)
         : 
        (<img src={obj?.properties.Cover.files[0]?.file.url} alt="" />)
        }
        
        <p>{obj?.properties.car_name.rich_text[0]?.plain_text}</p>

        <div className={styles.props}>
            <span>Потужність</span>
            <span>{obj?.properties.power.rich_text[0]?.plain_text}</span>
        </div>
      <div className={styles.props}>
            <span>Динаміка:</span>
            <span>{obj?.properties.acceleration.rich_text[0]?.plain_text}</span>
      </div>
           {/* <div className={styles.props}>
            <span>Максимальна швидкість:</span>
            <span>???</span>
        </div> */}
        <div className={styles.props}>
            <span>Витрати палива:</span>
            <span>{obj?.properties.fuel_consumption.number} л/100 км</span>
        </div>
        {/* <div className={styles.props}>
            <span>Кому підійде?</span>
            <span>???</span>
        </div>  */}

        {obj.properties.URL?.rich_text[0]?.plain_text === undefined ?
         <Link to={`/offer/${obj.properties.URL?.rich_text[0]?.plain_text}`} className="deActiveBtn" onClick={e=>e.preventDefault()}> Coming soon</Link>
          :
           <a href={`/offer/${obj.properties.URL?.rich_text[0]?.plain_text}`} >Подивитись</a> }
        {/* <Link to={`/offer/${obj.properties.URL?.rich_text[0]?.plain_text}`}>Подивитись</Link> */}
     
    </div>
  )
}
