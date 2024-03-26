import React, { useEffect,useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Offer.module.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Calculator from "../../Components/Calculator";
import MnuMob from "../../Components/MnuMob"
import Slider from "react-slick";
import debounce from "lodash.debounce";
import HubspotContactForm from '../../Components/HubspotContactForm';
import HubspotContactFormBottom from '../../Components/HubspotContactFormBottom';
import { getCars, closeMobMnu } from "../../redux/slices/carsSlice";


function SampleNextArrow(props) {
  const {  onClick } = props;
  return (
    <div
      className="nextArrow"
      onClick={onClick}
    >
      <img src="/img/slb-rightBig.png" alt="" className="shadowArr"/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
    className="prevArrow"
      onClick={onClick}
    > <img src="/img/slb-leftBig.png" alt="" className="shadowArr" /></div>
  );
}


export default function Offer() {
  const comunityRef = useRef();
  const reviewsRef = useRef();
  const dispatch = useDispatch();
  const [changedCar, setChangedCar] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const bg = useSelector((state) => state.cars.bg);
  const cars = useSelector((state) => state.cars.cars);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCars());
    dispatch(closeMobMnu(false));
  }, []);

  useEffect(()=>{
    const currentCar = cars?.find((obj) => obj.properties.URL.rich_text[0]?.plain_text === id);
 
    setChangedCar(currentCar);
  }, [cars])



  const comunitySlider = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    lazyLoad: true,
    slidesToScroll: 1,
    centerPadding: 0,
    dots: true,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 992,
        settings: {
         // className: "center",
          slidesToShow: 1,
          centerPadding: "24px",
          centerMode: true,
        },
      },
    ],
  };
  const revSlider = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    lazyLoad: true,
    slidesToScroll: 1,
    centerPadding: "60px",
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
     centerMode: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    // beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "22px",
          centerMode: true,
          adaptiveHeight: true

        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          centerPadding: "110px",
          centerMode: true,
        },
      },
      {
        breakpoint: 1980,
        settings: {
          slidesToShow: 5,
          centerPadding: "110px",
          centerMode: true,
        },
      },
      {
        breakpoint: 1730,
        settings: {
          slidesToShow: 4,
          centerPadding: "110px",
          centerMode: true,
        },
      },
    ],
  };

  const revs = [
    {
      name: "Roman Cherepakha",
      avatar: "/img/r1.webp",
      text: "One-stop shop в користуванні авто, на який ми заслуговуємо + постійний розвиток сервісу + висока якість та клієнтоорієнтованість.",
      link: "https://www.facebook.com/romek.che/posts/5905667742779566?ref=embed_post"
    },
    {
      name: "Grigory Bakunov",
      avatar: "/img/r1.webp",
      text: "Я пока в восторге от уровня сервиса, посмотрим как будет дальше. Не реклама, вы меня знаете, рекламу я бы сделал лучше. Просто хочу чтобы основатель Драйвово Соловйов Максим и сервис, который мне нравится, продолжал жить хорошо и меня радовал",
      link: "https://www.facebook.com/thebobuk/posts/10230579558419299?ref=embed_post"
    },
    {
      name: "Kirill Birchenko",
      avatar: "/img/r3.webp",
      text: "В Drivovo на первом месте не машины, а клиенты и отношении к ним. Drivovo делает все необходимое для счастья своих пользователей, и с их командой, мне как клиенту, приятно работать. Очень рад, что встретил компанию, и воспользовался именно их подпиской.",
      link: "https://www.facebook.com/kirill.birchenko.9/posts/1357491441385030?ref=embed_post"
    },
    {
      name: "Dmytro Marakhovskyi",
      avatar: "/img/r4.webp",
      text: "Невероятно удобный сервис! Решение, которого до этого на рынке не было.      Новые машины в классных комплектациях. Привозят заправленную чистую машину, в багажнике омыватель, зонтик, страховка и все, что может пригодиться. Профессиональные, вежливые и отзывчивые сотрудники!) Очень рекомендую!",
      link: "https://www.facebook.com/d.marakhovsky/posts/10158731298577194?ref=embed_post"
    },
    {
      name: "Mariya Ivanova",
      avatar: "/img/r5.webp",
      text: "«Фокусируйтесь на важном для себя и получайте удовольствие от жизни» - очень импонирует подход и философия      Самые интересные комплектации, гибкость условий, не просто клиентоориентированность а развитие отношений, формат клуба по интересам — мечта водителя)",
      link: "https://www.facebook.com/mariya.ivanova.3154284/posts/10160306303988115?ref=embed_post"
    },
    {
      name: "Сергій Нетяга",
      avatar: "/img/r6.webp",
      text: "Отличный сервис, без кучи бюрократии. Договорились о подписке за 30 минут и через день машину привезли в другой конец Украины заправленную (а сейчас дефицит на топливо) и только с мойки.",
      link: "https://www.facebook.com/rrjurr/posts/5382408531825839?ref=embed_post"
    },
  ]

  const slidersImg = [
    "/img/sl1.jpg",
    "/img/sl2.jpeg",
    "/img/sl3.jpeg",
    "/img/sl4.jpeg",
    "/img/sl5.jpeg",
    "/img/sl6.jpeg",
    "/img/sl7.jpeg",
    "/img/sl8.jpeg",
  ]


 
  const onWheelSlider = useCallback(
    debounce((e) => {
   
      if (!comunityRef.current) return;

      if (e.deltaX > 0) {
        comunityRef.current.slickNext();
      } else if (e.deltaX < 0) {
        comunityRef.current.slickPrev();
      }
    }, 20),
    [],
  );

  return (
    <div className={styles.pagerWrapper}>
        <MnuMob />
      <Header />
      {/* <div className={styles.block_1} style={{ backgroundImage: `url(${bg})` }}>
        <h1>Прозора економіка в деталях</h1>
      </div> */}
    
        <Calculator id={id} />
      

      <section className={styles.notice1}>
        <div className={styles.imgPart}>
          <img src="../img/notice1.jpeg" alt="" />
        </div>
        <div className={styles.rightPart}>
          <h2 >Drivovo - ви фабрика автомобільного щастя!</h2>
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

      <iframe className="meetings-wrapper" src="https://drivovo.com/meetings/"></iframe>

      <section className={`${styles.titleSection} ${styles.noMobPadding}`}>
        <h2 className="customH2">
          Приєднуйся до ком'юніті Drivovo <span>Pride</span>
        </h2>
        <p>Це як потужний двигун та комфортний салон життя.</p>
      </section>
    

     <div onWheel={onWheelSlider}>
        <Slider {...comunitySlider} ref={comunityRef} className="carComunitySlider">
          {slidersImg?.map((img, idx) => (
            <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
              <img src={img} alt={img} />
            </div>
          ))}

        </Slider>
      </div>    
       

      {/* <section className={`${styles.titleSection} ${styles.noMobPadding}`}>
        
      </section> */}

       <div className="revs">
       <h2 className="customH2">
        Відгуки наших клієнтів
        </h2>
          <Slider {...revSlider} ref={reviewsRef} className="revSlider">
          { revs.map( (obj, i) => (
             <div className="item" key={i}>
             <p className="rev-text">{obj.text}</p>
               <div className="rev-str">
                 <img src="/img/fb.png" alt="drivovo - facebook review" className="rev_fb" />
                 <a href={obj.link} className="go_to_rev" target="blank">Перейти до відгуку</a>
               </div>

               <div className="rev-str bottom-str">
                 <img src={obj.avatar} alt="" className="avatar" />
                 <div className="data">
                   <p className="name">{obj.name}</p>
                   <span>близько 1 року назад</span>
                 </div>
               </div>
           </div>
           
           
          )
          )}
           


          </Slider>
       </div>

      {/* <section className={styles.photos}>
        <img src="../img/pkImg.jpeg" className={styles.pkImg} alt="" />
        <img src="../img/mobImg.jpeg" className={styles.mobImg} alt="" />
      </section> */}

      <section className={styles.titleSection}>
        <h2>
          Будуємо стосунки довжиною в <span>Життя</span>
        </h2>
        <p>Та надаємо потужний бустер для розвитку. </p>
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
      {/* <div className={styles.driveEasy}>Drive IT easy!</div> */}
      
      <section className={styles.titleSection}>
        <h2 className="ikigay_title">
          Drivovo - ікігай твого автомобіля
        </h2>
      </section>

      <div className={styles.hbsp_box}>

      <HubspotContactFormBottom />

      <div className={styles.hbsp_box_img}>
        <img src={changedCar?.properties.bottom_cover.files[0]?.file?.url} alt="" />
      </div> 
      </div>


      <Footer />
    </div>
  );
}
