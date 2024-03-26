import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./OldOffer.module.scss";
import Footer from "../../Components/Footer";
import Calculator from "../../Components/Calculator";

export default function Offer() {
  const bg = useSelector((state) => state.cars.bg);
  const { id } = useParams();
  return (
    <div className={styles.pagerWrapper}>
      
      <div className={styles.block_1} style={{ backgroundImage: `url(${bg})` }}>
        <h1>Прозора економіка в деталях</h1>
      </div>
      <div className="ApiWrap">
        <Calculator id={id} />
      </div>

      <section className={styles.notice1}>
        <div className={styles.imgPart}>
          <img src="../img/notice1.jpeg" alt="" />
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
        <img src="../img/pkImg.jpeg" className={styles.pkImg} alt="" />
        <img src="../img/mobImg.jpeg" className={styles.mobImg} alt="" />
      </section>

      <section className={styles.titleSection}>
        <h2>
          Будуємо стосунки довжиною в <span>Життя</span>
        </h2>
        <p>Та надаємо потужний бустер для для розвитку. </p>
      </section>

      <section className={styles.notice2}>
        <div className={styles.imgPart}>
          <img src="../img/seo.jpeg" alt="" />
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
