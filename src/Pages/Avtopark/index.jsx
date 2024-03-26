import React, { useEffect,useState } from "react";
import styles from "./Avtopark.module.scss";
import {Helmet} from "react-helmet";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Car from "../../Components/Car";
import Skeleton from "../../Components/Skeleton";
import MnuMob from "../../Components/MnuMob"
import HubspotContactFormBottom from "../../Components/HubspotContactFormBottom"


import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCars, hidePreloader, closeMobMnu } from "../../redux/slices/carsSlice";

export default function Avtopark() {
    const cars = useSelector((state) => state.cars.cars);
    const isLoaded = useSelector((state) => state.cars.isLoaded);
    const dispatch = useDispatch();
    const [activeCars, setActiveCars] = useState([]);

    // const getCars = async () => {
    //     try {
    //       console.log(process.env.REACT_APP_PROXY);
    //       const { data } = fetch(`${process.env.REACT_APP_PROXY}/cars`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //           setCars(res.data.results);
    //           if(res.data.results){
    //             setTimeout(()=>{dispatch(hidePreloader());}, 1000) 
    //           }
    //         });
    //     } catch (e) {
    //       console.log(e.message);
    //     }
    //   };
    
      useEffect(() => {
       if(cars){
          setTimeout(()=>{dispatch(hidePreloader());}, 1000) 
       }
        const tempArr = cars.filter( obj=> obj.properties.Status.status?.name === "Done")
        .sort((a,b) => (a.properties.car_price_ex_showroom.number < b.properties.car_price_ex_showroom.number) ? 1 : -1);


        setActiveCars(tempArr)
      }, [cars]);

      useEffect(()=>{
        dispatch(getCars());
        dispatch(closeMobMnu(false));
      }, []);

      const items = activeCars?.map((obj, i)=>  <Car {...obj} key={i} />)
      const skeleton = [...new Array(9)].map((item, i) => <Skeleton key={i} />);


  return (
    <>
      <Helmet>
        <title>Автопарк</title> 
        {/* <meta name="description" content={changedCar?.properties.Text.rich_text[0].text.content} />
        <meta property="og:title" content={changedCar?.properties.Name.title[0].plain_text} />
        <meta property="og:image" content={changedCar?.properties.Cover.files[0].file.url} />
        <meta property="og:description" content={changedCar?.properties.Text.rich_text[0].text.content} /> */}
   
<script>
             { `(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3696851,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
              `}

          </script>
          
      

          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20308897.js"></script>
      </Helmet>
      
      <div className={styles.avtopark}>
      <MnuMob />
      <Header />

      <h1>Aвтопарк <span>Drivovo</span> </h1>
      <p>Автохаб для справжніх поціновувачів — спешл фор ю! Пристебни паски безпеки, бо з нашим автопарком захочеться ще більше драйву! А якщо не знайшов бажану тачку — залишай запит, ми зробимо все можливе, щоб задовольнити твою автомобільну мрію!</p>

      <div className={styles.avtoparkFlex}>
      {isLoaded === false ? skeleton : items  }
      </div>

      
      
      <div className={styles.seo}>
        <p> Volkswagen, Volvo, Hyundai, AUDI, Porsche — що з цього твоє? Обирай будь-яку тачку, бо ми точно знаємо, що тобі подарує адреналін!</p>
        <p>Всі наші авто вже готові до найкрутіших пригод, тому забудь про довгі процедури оформлення паперів. Ти береш ключі і… вже сидиш за кермом!</p>
        <p>Повний вибір комплектацій — обирай сам, які додаткові фішки хочеш мати у своєму авто. Будь-то стильні диски, крута аудіосистема чи навігація. Тут ти точно знайдеш авто своєї мрії!</p>
        <p>
        Не можеш вирішити? Відчуй всю потужність та драйв, які може надати тобі наше авто, під час тест-драйву. До двох годин без жодних обмежень по швидкості</p>
        <p>Бери новеньке авто в підписку — відчуй, що таке кайф на дорозі разом з Drivovo!</p>
     
      </div>

      <div className={styles.hbsp_box}>

      <HubspotContactFormBottom />

      <div className={styles.hbsp_box_img}>
        <img src="/img/footerBgc.webp" alt="" />
      </div>
       
           
      </div>

      <Footer />
    </div>
      
      </>
    
  )
}
