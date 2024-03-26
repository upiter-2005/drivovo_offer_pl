import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Footer from "../Components/Footer";
import Offer from "../Components/Offer";
import { useDispatch, useSelector } from "react-redux";
import { hidePreloader, showPreloader } from "../redux/slices/carsSlice";


export default function Home() {
  const bg = useSelector((state) => state.cars.bg);
  const cars = useSelector((state) => state.cars.cars);
  const [activeCars, setActiveCars] = useState([]);
 
  const [currentCar, setCurrentCar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Drivovo offer";
document.getElementsByTagName("META")[2].content="Your description about the page or site here to set dynamically";

  }, []);



  const handlerChange = (e) => {
    dispatch(showPreloader());
    
    setTimeout(()=>{dispatch(hidePreloader());}, 3000) 
    const currentCar = cars.find((obj) => obj.url === e.target.value);
     setCurrentCar(currentCar);
    // setImageIndex(0);
    // setImages(currentCar.properties.Photo.files);
  };
  useEffect(()=>{
    const tempArr = cars.filter( obj=> obj.properties.Status_avto.select?.name !== "disable");
    setActiveCars(tempArr)
  }, [cars])

  return (
    <div className={styles.pagerWrapper}>
      <div className={styles.block_1} style={{ backgroundImage: `url(${bg})` }}>
          <div className={styles.banerBox}>
          <h1>Калькулятор вартості володіння</h1>
          <p>Обери будь-яке авто з автопарку Drivovo, щоб дізнатися скільки ти витратиш на нього за 3 роки користування</p>
          <div className={styles.selectBox}>
            <select name="" id="" onChange={handlerChange}>
              <option value="">Вибери авто</option>
              {activeCars?.map((obj, i) => (
                <option key={obj.url} value={obj.url}>
                  {obj.properties.Name.title[0]?.plain_text}
                </option>
              ))}
            </select>
          </div>
        </div>
        
      </div>


      <div className="ApiWrap">
        <Offer data={currentCar} />
      </div>

      <section className={styles.notice1}>
        <div className={styles.imgPart}>
          <img src="img/notice1.jpeg" alt="" />
        </div>
        <div className={styles.rightPart}>
          <h2>Drivovo - ви фабрика автомобільного щастя!</h2>
          <div className={styles.textBlock}>
            Перший в моїй практиці клієнт-орієнтований сервіс в Україні. Хто не знає — все просто —
            це коли ти маєш авто та емоції, про які завжди мріяв, але без потреби купувати.
            Насправді це більше ніж просто послуга — ти частина драйвового ком‘юніті, спілкуєшся з
            прогресивними людьми, обмінюєшся авто, отримуєш нові і нові враження.
          </div>
          <div className={styles.notice1_flex}>
            <div>
              <p className={styles.notice1_name}>Alexandr Shevchenko</p>
              <p className={styles.notice1_descr}>
                Board Member/Chief Operating Officer у{" "}
                <a href="https://www.facebook.com/devoxsoftware" target="blank">Devox Software</a>{" "}
              </p>
            </div>

            <a href="https://www.facebook.com/DrivovoClub/reviews" target="blank">
              читати усі відгуки
            </a>
          </div>
        </div>
      </section>

      <section className={styles.titleSection}>
        <h2>
          Приєднуйся до ком'юніті Drivovo <span>Pride</span>
        </h2>
        <p>Це як потужний двигун та комфортний салон життя.</p>
      </section>

      <section className={styles.photos}>
        <img src="img/pkImg.jpeg" className={styles.pkImg} alt="" />
        <img src="img/mobImg.jpeg" className={styles.mobImg} alt="" />
      </section>

      <section className={styles.titleSection}>
        <h2>
          Будуємо стосунки довжиною в <span>Життя</span>
        </h2>
        <p>Та надаємо потужний бустер для для розвитку. </p>
      </section>

      <section className={styles.notice2}>
        <div className={styles.imgPart}>
          <img src="img/seo.jpeg" alt="" />
        </div>
        <div className={styles.leftPart}>
          <h2>
            Наша ціль — звільнити час та думки людей, які розвивають бізнес та технології, надати їм
            швидкості та комфорту в житті.
          </h2>

          <div>
            <p className={styles.notice2_name}>Макс Соловйов</p>
            <p className={styles.notice2_descr}>CEO & Co-Founder DRIVOVO</p>
          </div>
        </div>
      </section>
      <div className={styles.driveEasy}>Drive IT easy!</div>
      <Footer />
    </div>
  );
}
