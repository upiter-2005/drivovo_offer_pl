import {useEffect, useState} from "react";
import styles from "./Footer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalForm from "../ModalForm"

export default function Footer() {

  const [cars, setCars] = useState([]);
  const [activeCars, setActiveCars] = useState([]);
  const modalForm = useSelector(state => state.cars.modalForm);


  const getCars = async () => {
    try {
      const { data } = fetch(`${process.env.REACT_APP_PROXY}/cars`)
        .then((res) => res.json())
        .then((res) => {
          setCars(res.data.results);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const tempArr = cars?.filter( obj=> obj.properties?.Status_avto?.select?.name !== "disable");
    setActiveCars(tempArr);

    getCars();
  }, []);

  return (
    <>
    {modalForm &&  <ModalForm />}
    
   
        <footer>
      <div className={styles.footer_wrap}>
        <div className={styles.block_1}>
          <a href="https://drivovo.com" className={styles.footerLogo}>
            <img src="/img/main-logo.svg" alt="drivovo" />
          </a>
          <div>
            <a
              href="https://www.instagram.com/drivovoofficial/"
              target="blank"
              className={styles.soc_ico}>
              <img src="/img/insta.svg" alt="drivovo instagramm" />
            </a>
            <a href="https://www.youtube.com/@drivovo" target="blank" className={styles.soc_ico}>
              <img src="/img/youtube.svg" alt="drivovo youtube" />
            </a>
            <a
              href="https://www.facebook.com/DrivovoClub"
              target="blank"
              className={styles.soc_ico}>
              <img src="/img/fb.svg" alt="drivovo facebook" />
            </a>
            <a
              href="https://www.linkedin.com/company/drivovo/"
              target="blank"
              className={styles.soc_ico}>
              <img src="/img/in.svg" alt="" />
            </a>
            <a
              href="https://www.tiktok.com/@drivovoofficial"
              target="blank"
              className={styles.soc_ico}>
              <img src="/img/tiktok.svg" alt="" />
            </a>
          </div>
          <a href="tel:+380634128840" className={styles.tel}>
            +380 63 412 8840
          </a>
        </div>

        <div className={styles.mnu_Items}>

          <div className={styles.block_2}>
            <p>Меню</p>
            
            <div>
              {/* <a href="#">Для бізнесу</a>
              <a href="#">Події</a>
              <a href="#">Партнерам</a> */}
              {/* <a href="#">Сервіси</a> */}
              <a href="https://drivovo.com/outlet/">Outlet</a>
              <a href="https://drivovo.com/beta-test/">Beta-test</a>
              <a href="https://drivovo.com/blog/">Блог</a>
              <a href="https://drivovo.com/questions/">FAQ</a>
              <a href="https://drivovo.com/kontakty/">Контакти</a>
              
            </div>
          </div>
          <div className={styles.block_3}>
            <p>Автопарк</p>
            <div className={styles.modelsLinks}>
            
              {cars?.filter(obj => obj.properties?.Footer?.select?.name === "+")
              .map((obj, i) => <a href={`/offer/${obj.properties.URL.rich_text[0]?.plain_text}`} key={obj.url}>{obj.properties.car_name.rich_text[0].plain_text}</a>)
              }
            
            </div>
          
          </div>
        </div>
        
      </div>
      <div className={styles.copy}>©2020 - 2024 Drіvovo. All rights reserved.</div>
    </footer>
    </>

  );
}
