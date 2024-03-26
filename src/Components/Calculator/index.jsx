import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Helmet} from "react-helmet";
import styles from "./Calculator.module.scss";
import { getCars, setPopupFormImage, hidePreloader, openModalForm, openModalSlider, openDinamic } from "../../redux/slices/carsSlice";
import Slider from "react-slick";
import YouTube from "react-youtube";
import debounce from "lodash.debounce";
import HubspotForm from 'react-hubspot-form'
import HubspotContactForm from '../../Components/HubspotContactForm'
import Modal from '../Modal'
import ModalSlider from '../ModalSlider'
import HubspotPopupDinamic from '../HubspotPopupDinamic'

//import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const {  onClick } = props;
  return (
    <div
      className={styles.nextArrow}
      onClick={onClick}
    >
      <img src="/img/sl-right.png" alt="" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
    className={styles.prevArrow}
      onClick={onClick}
    > <img src="/img/sl-left.png" alt="" /></div>
  );
}


const Calculator = memo( function Calculator({ id }) {
  //const [cars, setCars] = useState([]);

  const [activeNumSlide, setActiveNumSlide] = useState(1);
  const [changedCar, setChangedCar] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [startFund, setStartFund] = useState(0);
  const [pricePerMonth, setPricePerMonth] = useState(0);
  const [persent, setPersent] = useState(0.4);
  const [drivovoPrice, setDrivovoPrice] = useState(0);
  const [lastPayment, setLastPayment] = useState(0);
  const [dopCost, setDopCost] = useState(0);
  const [ownerThreeYearsCost, setOwnerThreeYearsCost] = useState(null);
  const [images, setImages] = useState(null);
  const [pricePerMonth40, setPricePerMonth40] = useState(0);
  const [pricePerMonth50, setPricePerMonth50] = useState(0);
  const [pricePerMonthStandart, setPricePerMonthStandart] = useState(0);
  const [costDop40, setCostDop40] = useState(0);
  const [costDop50, setCostDop50] = useState(0);
  const [garantyStandart, setGarantyStandart] = useState(0);
  const [garanty, setGaranty] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  

  const sliderRef = useRef();
  const videoYt = useRef();
  const isPlay = useRef(false);
  const cars = useSelector((state) => state.cars.cars);
  const isModal = useSelector((state) => state.cars.isModal);
  const isModalSlider = useSelector(state => state.cars.isModalSlider);
   const openPopupCarDinamic = useSelector(state => state.cars.openPopupCarDinamic);
  const dispatch = useDispatch();

  const table1 = useRef();
  const table2 = useRef();
  //const table3 = useRef();
  const btn1 = useRef();
  const btn2 = useRef();
  //const btn3 = useRef();
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src="../img/rightAr.svg" alt="" />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src="../img/rightAr.svg" alt="" />
      </div>
    );
  };
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    lazyLoad: true,
    slidesToScroll: 1,
    centerPadding: 0,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          className: "center",
          slidesToShow: 1,
          centerPadding: "24px",
          centerMode: true,
        },
      },
    ],
  };

  const widthDetect = () => {
    const w = window.innerWidth;
    if (w < 1024) {

      table1?.current?.classList.add("showTable");
      table2?.current?.classList.add("hideTable");
      //table3.current.classList.add("hideTable");
      btn1?.current?.classList.add("activeTab");
      setIsMobile(true)
    }
  
  };
  const getCostPerDay = () => {
    const res = (
      (((parseFloat(drivovoPrice) / 36).toFixed(2) -
        (parseFloat(ownerThreeYearsCost) / 36).toFixed(2)) *
        37) /
      30
    ).toFixed(0);
    return res;
  };
  const handleTabs = (type) => {
    if (type == "t1") {
      table1.current.classList.remove("hideTable");
      table1.current.classList.add("showTable");
      table2.current.classList.add("hideTable");
      table2.current.classList.remove("showTable");
      //table3.current.classList.add("hideTable");
      //table3.current.classList.remove("showTable");
      btn1.current.classList.add("activeTab");
      btn2.current.classList.remove("activeTab");
      //btn3.current.classList.remove("activeTab");
    }
    if (type == "t2") {
      table2.current.classList.remove("hideTable");
      table2.current.classList.add("showTable");
      //table3.current.classList.add("hideTable");
      //table3.current.classList.remove("showTable");
      table1.current.classList.add("hideTable");
      table1.current.classList.remove("showTable");
      btn1.current.classList.remove("activeTab");
      btn2.current.classList.add("activeTab");
      //btn3.current.classList.remove("activeTab");
    }
    // if (type == "t3") {
    //   table1.current.classList.add("hideTable");
    //   table1.current.classList.remove("showTable");
    //   table2.current.classList.add("hideTable");
    //   table2.current.classList.remove("showTable");
    //   //table3.current.classList.remove("hideTable");
    //   //table3.current.classList.add("showTable");
    //   btn1.current.classList.remove("activeTab");
    //   btn2.current.classList.remove("activeTab");
    //   //btn3.current.classList.add("activeTab");
    // }
  };
  const numberWithCommas = (x) => {
    if (x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
     
      return x;
    }
    return;
  };

  const startFundCount = () => {
    const result = (
      parseInt(changedCar?.properties.car_price_ex_showroom.number) +
      parseFloat(changedCar?.properties.pension_fund.formula.number.toFixed(0)) +
      parseFloat(changedCar?.properties.insurance_1_year.formula.number) +
      parseFloat(changedCar?.properties.registration.formula.number) +
      parseFloat(changedCar?.properties.luxury_tax.number) +
      parseFloat(changedCar?.properties.tinted_glass.formula.number) +
      parseFloat(changedCar?.properties.tires.number) +
      parseFloat(changedCar?.properties.carpets.number) +
      parseFloat(changedCar?.properties.safety_net.formula.number) +
      parseFloat(changedCar?.properties.radiator_protection.number) +
      parseFloat(changedCar?.properties.armored_film.number)
    )
      //parseFloat(changedCar?.properties.insurance_2_year.formula.number)
      .toFixed(2);
 
    setStartFund(result);
  };

  // Вартість володіння автомобілем за 3 роки
  const ownThreeYearsCount = () => {
    const result = (
      parseFloat(startFund) +
      parseFloat(((startFund / 100) * 21).toFixed(2)) +
      parseFloat(changedCar?.properties.tire_service.formula.number) +
      parseFloat(changedCar?.properties.luxury_tax_2_years.number) +
      parseFloat(changedCar?.properties.osago_2_year.formula.number) +
      parseFloat(changedCar?.properties.maintenance.formula.number) +
      //parseFloat(changedCar?.properties.armored_film.number) +
      parseFloat(changedCar?.properties.insurance_2_year.formula.number)
    ).toFixed(2);

    const dop = (
      parseInt(changedCar?.properties.car_price_ex_showroom.number) +
      parseFloat(changedCar?.properties.carpets.number) +
      parseFloat(changedCar?.properties.armored_film.number)
    ).toFixed(2);

    const last = dop * persent;

    const maxPrice = parseFloat(result) + parseFloat(result * 0.13);

    const perMonth = ((parseFloat(maxPrice) - parseFloat(last)) / 36).toFixed(0);

    setDopCost(dop); // вартість з доп
    setLastPayment(last); // останній платіж
    setDrivovoPrice(maxPrice.toFixed(0)); // ватість з викупом
    setPricePerMonth(perMonth); //місячна підписка
    setOwnerThreeYearsCost(result);

    const last40 = dop * persent;
    const perMonth40 = ((parseFloat(maxPrice) - parseFloat(last40)) / 36).toFixed(0);
    setCostDop40(last40);

    const last50 = dop * persent;
    const perMonth50 = ((parseFloat(maxPrice) - parseFloat(last50)) / 36).toFixed(0);
    setCostDop50(last50);


    
    if (changedCar?.properties.car_price_ex_showroom.number > 50000) {
      const garanty1 = (maxPrice - last40) / (36 + 8);
      setGarantyStandart(garanty1 * 8);

      const garanty2 = (maxPrice - last50) / 36;
      setGaranty(garanty2 * 6);

      setPricePerMonthStandart((parseFloat(maxPrice - last40) / 36).toFixed(0));
      setPricePerMonth40((parseFloat(maxPrice - last40) / (36 + 8)).toFixed(0));
    } else {
      const garanty1 = (maxPrice - last40) / (36 + 6);
      setGarantyStandart(garanty1 * 6);

      const garanty2 = (maxPrice - last50) / 36;
      setGaranty(garanty2 * 5);

      setPricePerMonthStandart((parseFloat(maxPrice - last40) / 36).toFixed(0));
      setPricePerMonth40((parseFloat(maxPrice - last40) / (36 + 6)).toFixed(0));
    }

  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getCars());
    widthDetect();
    if (typeof window !== "undefined") {
      if (window.fbq != null) { 
        window.fbq('track', 'PageView')
      }
    }
      
  }, []);

  const openModalArea = () => {
    if(!isMobile) dispatch(openModalSlider());
  }
  useEffect(() => {
    const currentCar = cars?.find((obj) => obj.properties.URL.rich_text[0]?.plain_text === id);
    // console.log(currentCar);
    setChangedCar(currentCar);
    setImages(currentCar?.properties.Photo.files);
    if(currentCar?.properties.residual_value?.number !== 0){
      setPersent(currentCar?.properties.residual_value?.number)
    }else{
      setPersent(0.4)
    }
    
    dispatch(setPopupFormImage(currentCar?.properties.Cover.files[0].file?.url));
 
    startFundCount();
    if(currentCar){
      setTimeout(()=>{dispatch(hidePreloader());}, 3000)
      
    }
  }, [cars, id]);

  useEffect(() => {
    startFundCount(); 
  }, [changedCar]);

  useEffect(() => {
    ownThreeYearsCount();
  }, [startFund]);

  useEffect(() => {
    if(pricePerMonthStandart){
      window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: "USD",
          value: pricePerMonthStandart,                    // https://prnt.sc/lweZZXCh-LL9 
          items: [
          {
            item_name: changedCar?.properties.car_name.rich_text[0]?.plain_text,  // https://prnt.sc/kbktg09N6xOy 
            price: pricePerMonthStandart,                  // https://prnt.sc/lweZZXCh-LL9  
          }
          ]
        }
      });
    }
  
  }, [changedCar,pricePerMonthStandart]);

  const onWheelSlider = useCallback(
    debounce((e) => {
    
      if (!sliderRef.current) return;

      if (e.deltaX > 0) {
        sliderRef.current.slickNext();
      } else if (e.deltaX < 0) {
        sliderRef.current.slickPrev();
      }
    }, 20),
    [],
  );

  const topSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => {
      setActiveNumSlide(state=> next + 1 ); 
     
    },
   // responsive: []
  };


  const popupHandler = () => {
    
     dispatch(openDinamic())
    if(window.fbq){
      window.fbq('track', 'ViewContent',{
        content_ids: [changedCar?.id],
        content_name: changedCar?.properties.car_name.rich_text[0]?.plain_text
      })

      window.fbq('track', 'Purchase', {  
        value: parseFloat(pricePerMonthStandart).toFixed(2), 
        currency: 'USD', 
          content_type: 'product',
          content_ids: [changedCar?.id]
         
        })
      window.fbq('track', 'AddToCart', { 
        value: parseFloat(pricePerMonthStandart).toFixed(2), 
        currency: 'USD', 
          content_type: 'product',
          content_ids: [changedCar?.id]
         
        })
    
  }
  }
  

  const youTubeOpt = {
    height: "100%",
    width: "100%",
    enablejsapi: 1,
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  }

  console.log(changedCar)


  const playVideo = () => {
    console.log(isPlay.current);
    isPlay.current = !isPlay.current;
    console.log(isPlay.current);
    if(isPlay.current){
      videoYt.current.internalPlayer.playVideo() 
    }else{
      videoYt.current.internalPlayer.pauseVideo()
    }
    console.log(isPlay.current);
   
   
    
  }
  return (
    <>
    
     <Helmet>
        <title>{changedCar?.properties.seo_title.rich_text[0]?.plain_text}</title> 
        <meta name="description" content={changedCar?.properties.seo_description.rich_text[0]?.plain_text} />
        <meta property="og:title" content={changedCar?.properties.seo_title.rich_text[0]?.plain_text} />
        <meta property="og:image" content={changedCar?.properties.Cover.files[0].file.url} />
        <meta property="og:description" content={changedCar?.properties.seo_description.rich_text[0]?.plain_text} />
   
        <script src="https://www.youtube.com/iframe_api"></script>
       
<script>
             { `(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3696851,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
            

           
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
               fbq('init', '734507692124662');
               fbq('track', 'PageView');
             
              
              `}

          </script>
        
          <noscript>{`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=734507692124662&ev=PageView&noscript=1"
              />`}</noscript>
      

          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20308897.js"></script>
      </Helmet>

  <div className="ApiWrap">
      <div className={styles.box}>
        <div className={styles.offer_1}>
          <div className={`${styles.left} offerSlider`} onClick={openModalArea} >
              <img src="/img/zoom.png" className={styles.zoom} alt="drivovo zoom" />
              <Slider {...topSlider} className={`${styles.topCarousel} mainSlider` }>
                  <div key="mnphImg1" style={{ width: "100%" }} className={styles.sliderItem} >
                      <img src={changedCar?.properties.Cover.files[0].file?.url} 
                      className={styles.sliderTopImg} 
                      alt="" />
                  </div>
                {images?.map((img, idx) => (
                  <div  key={idx} style={{ width: "100%" }} className={styles.sliderItem} >
                    <img src={img.file?.url} alt={img} className={styles.sliderTopImg}  />
                  </div>
                ))}
            </Slider>
          
            <div className={styles.slideNumWrapper}>
               <div className={styles.digits}> {activeNumSlide }/{images?.length + 1}</div>
             
            </div>
           
            {/* {isModal && <Modal currentIndex={activeNumSlide} images={images} />} */}
            
            <div className={styles.foto_squre}>
            {images?.map((img, idx) => (
                  <div  key={idx}  className={styles.foto_squreItem} >
                    <img src={img.file?.url}
                     alt={`Drivovo - ${changedCar?.properties.car_name.rich_text[0]?.plain_text}`}
                     idx={idx}
                     //onClick={e => dispatch(openModal())}
                      />
                  </div>
                ))}
            </div>

          </div>
          {(isModalSlider && !isMobile) ?  (<ModalSlider images={images} />) : ('')}
          <div className={styles.right}>
            <div className={styles.right_sticky}>
            <div className={styles.date}>Оновлено {changedCar?.properties.edited_time.formula.date.start?.substr(11,8)} {changedCar?.properties.edited_time.formula.date.start?.substr(0,10)} </div>
            <h1 className={styles.title}>{changedCar?.properties.car_name.rich_text[0]?.plain_text}</h1>
            <div className={styles.descr}>Авто в наявності, сів та поїхав за 30 хвилин</div>
            <div className={styles.price}>  
            ${pricePerMonthStandart}    
           
            <p className={styles.perMonth}>щомісячний платіж</p>
            </div>
            <a href="#" className={styles.offerBtn} onClick={popupHandler}>Замовити авто</a>

          
            
            <div className={styles.garanty}>
              <img src="/img/clock-ico.svg" alt="Drivovo icon" />
              Гарантія на повернення депозиту 6 місяців
            </div>
            <p className={styles.titleBullet}>Авто комплектується:</p>
            
            <div className={styles.bullets}>

              <div className={styles.item}>
                <img src="/img/red-check.svg" alt="Drivovo icon" />
                Повний бак, парасолька, вода, вино
              </div>
              <div className={styles.item}>
                <img src="/img/red-check.svg" alt="Drivovo icon" />
                Органайзер для хімії та інструментів
              </div>
              <div className={styles.item}>
                <img src="/img/red-check.svg" alt="Drivovo icon" />
                Комплект тех. допомоги
              </div>
              
            </div>
          </div>
          </div>
            
        </div>
      </div>


       


      <div className={`${styles.box} ${styles.videoBlock}`}>
        

          <div className={styles.data}>
            <p className={styles.title}>{changedCar?.properties.Title.rich_text[0]?.plain_text}</p>
            <div className={styles.text}>{changedCar?.properties.Text.rich_text[0]?.text.content}</div>


        <div className={` ${styles.charContainer}`}>
        <h2>Характеристики</h2>
        <div className={styles.charBox}>
          <div className={styles.charItem}>
            <span>Розгін 0-100</span>
            <span>{changedCar?.properties.acceleration.rich_text[0]?.plain_text}</span>
          </div>

          <div className={styles.charItem}>
            <span>Потужність</span>
            <span>{changedCar?.properties.power.rich_text[0]?.plain_text}</span>
          </div>

          <div className={styles.charItem}>
            <span>Об’єм двигуна</span>
            <span>{changedCar?.properties.engine_capacity.rich_text[0]?.plain_text}</span>
          </div>

          <div className={styles.charItem}>
            <span>Двигун</span>
            <span>{changedCar?.properties.engine_type.select.name}</span>
          </div>

          <div className={styles.charItem}>
            <span>Салон</span>
            <span>{changedCar?.properties.vehicle_interior.select.name}</span>
          </div>

          <div className={styles.charItem}>
            <span>Тип приводу</span>
            <span>{changedCar?.properties.drive_type.select.name}</span>
          </div>

          <div className={styles.charItem}>
            <span>Тип кузову</span>
            <span>{changedCar?.properties.body_type.select.name}</span>
          </div> 

          <div className={styles.charItem}>
            <span>Витрати пального</span>
            <span>{changedCar?.properties.fuel_consumption.number} / 100 км</span>
          </div>

        </div>
      </div> 


          </div>


          <div className={styles.videoBox}>
   
          <YouTube
          ref={videoYt}
            videoId={changedCar?.properties.video.rich_text[0]?.plain_text}
            opts={youTubeOpt}
            // onReady={onPlayerReady}
            // onStateChange={onPlayerStateChange}
          />
            {/* <iframe width="100%"  src={`https://www.youtube.com/embed/${changedCar?.properties.video.rich_text[0]?.plain_text}` }title="Потужність та естетика Q7 у кожному сантиметрі🖤" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
            <div
            onClick={playVideo}
                   style={{height: "100%",
                          "width":"100%",
                          "position":"absolute",
                          "zIndex":"20",
                          "left": "0",
                          "top": "0"
                        }}></div>
        </div>


        </div>
        
        <div className={styles.divider}></div>
   
      {/* <div className="offerDescr">
      
        <h2>{changedCar?.properties.Title.rich_text[0].plain_text}</h2>
        <div className="descrBlock">{changedCar?.properties.Text.rich_text[0].text.content}</div>
      </div> */}

      {/* <div onWheel={onWheelSlider}>
        <Slider {...settings} ref={sliderRef}>
          {images?.map((img, idx) => (
            <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
              <img src={img.file.url} alt={img} />
            </div>
          ))}
        </Slider>
      </div> */}

      <div className={styles.selectBox}></div>


      <h3 className="customH2">Ти цього вартий👌 <br/> Що під капотом підписки?</h3>
      
      <div className={`${styles.table} ${styles.stripeNewTable} ${styles.pk_table}`}>
        {/* <div className={styles.tableRow}>
          <span className={styles.tableTitle}>
            {changedCar?.properties.Name.title[0].plain_text}
          </span>
          <span className={styles.tableTitle}>Підписка Drivovo</span>
        </div> */}
        <div className={styles.tableRowSubTitle}>
          <div className={`${styles.centerTitileRow} ${styles.leftAlign}`}>Підписка</div> 
          <div className={`${styles.centerTitileRow} ${styles.leftAlign}`}>Сервіс</div> 
         
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Реєстрація авто + оплата податків (ПФ, податок на розкіш) 
          <img src="/img/table-check.svg" alt="" /> </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Супровід страхових випадків, підмінне авто 
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Бронеплівка, тонування, килимки 
          <img src="/img/table-check.svg" a lt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Драйвер ТО, СТО
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>КАСКО+ОСАГО за 3 роки
          <img src="/img/table-check.svg" alt="" /></span>

          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Доступ в комʼюніті Drivovo Pride
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Зимова гума, зберігання, шиномонтаж
          <img src="/img/table-check.svg" alt="" /></span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Дисконтний клуб Drivovo Loyalty
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Технічне обслуговування
          <img src="/img/table-check.svg" alt="" /></span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Інвестиції в Drovovo 10-12% річних в валюті
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Trade IN старого авто
          <img src="/img/table-check.svg" alt="" /></span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Тестування різних авто з Drivovo Hub
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Upgrade | Downgrade авто за підпискою 
          <img src="/img/table-check.svg" alt="" /></span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Захист кредитної історії
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>
       
      </div>


      <div className={`${styles.table} ${styles.stripeNewTable} ${styles.mob_table}`}>
        {/* <div className={styles.tableRow}>
          <span className={styles.tableTitle}>
            {changedCar?.properties.Name.title[0].plain_text}
          </span>
          <span className={styles.tableTitle}>Підписка Drivovo</span>
        </div> */}
        <div className={styles.tableRowSubTitle}>
          <div className={`${styles.centerTitileRow} `}>Підписка</div> 
          
         
        </div>
        <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Реєстрація авто + оплата податків (ПФ, податок на розкіш) 
          <img src="/img/table-check.svg" alt="" /> </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Бронеплівка, тонування, килимки  
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>КАСКО+ОСАГО за 3 роки <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
            Зимова гума, зберігання, шиномонтаж
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Технічне обслуговування
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Trade IN твого старого авто
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Upgrade | Downgrade авто за підпискою 
          <img src="/img/table-check.svg" alt="" />
          </span>
        </div>

        <div className={styles.tableRowSubTitle}>
          <div className={`${styles.centerTitileRow} ${styles.topPadding} `}>Сервіс</div> 
          
         
        </div>
         <div className={styles.tableRow}>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>Супровід страхових випадків, підмінне авто
          <img src="/img/table-check.svg" alt="" /> </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
            Драйвер ТО, СТО  
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Доступ в комʼюніті Drivovo Pride
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Дисконтний клуб Drivovo Loyalty
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Інвестиції в Drovovo 10-12% річних в валюті
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Тестування різних авто з Drivovo Hub
          <img src="/img/table-check.svg" alt="" />
          </span>
          <span className={`${styles.tableItem} ${styles.tableItemNew}`}>
          Захист кредитної історії
          <img src="/img/table-check.svg" alt="" />
          </span>
          
        </div>
       
       
      </div>



      <h3 className="customH2">Дозволь собі це 😎 <br/>
                      З чого складається підписка?</h3>
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <span className={styles.tableTitle}>
            {changedCar?.properties?.Name?.title[0]?.plain_text}
          </span>
          <span className={styles.tableTitle}>Підписка Drivovo</span>
        </div>
      
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Авто</span>
          <span className={`${styles.tableItem} spacing`}>
          $ {  
            ((
              (
                parseInt(changedCar?.properties.car_price_ex_showroom.number.toFixed(0) )
                + parseInt(((startFund / 100) * 21).toFixed(0))
              ) 
            - parseInt(lastPayment.toFixed(0))) / 36).toFixed(0)
            }
            
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Податки / оформлення</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {(parseInt(changedCar?.properties.luxury_tax.number + 
                        changedCar?.properties.luxury_tax_2_years.number +  
                        changedCar?.properties.pension_fund.formula.number +  
                        changedCar?.properties.registration.formula.number 
              ) / 36).toFixed(0)}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>КАСКО + ОСАГО</span>
          <span className={`${styles.tableItem} spacing`}>
          $ {(parseInt(changedCar?.properties.osago.formula.number + 
                        changedCar?.properties.osago_2_year.formula.number + 
                        changedCar?.properties.insurance_1_year.formula.number + 
                        changedCar?.properties.insurance_2_year.formula.number  
              ) / 36).toFixed(0)}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>ТО</span>
          <span className={`${styles.tableItem} spacing`}>
          $ {(parseInt(changedCar?.properties.maintenance.formula.number 
              ) / 36).toFixed(0)}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Зимова гума, зберігання, шиномонтаж</span>
          <span className={`${styles.tableItem} spacing`}>
          $ {(parseInt(changedCar?.properties.tire_service.formula.number +
                      changedCar?.properties.tires.number
              ) / 36).toFixed(0)}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Додаткове обладнання</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {(parseInt(changedCar?.properties.safety_net.formula.number +
                      changedCar?.properties.armored_film.number +
                      changedCar?.properties.carpets.number +
                      changedCar?.properties.motor_protection_month.formula.number

              ) / 36).toFixed(0)}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Сервіс Drivovo (Супровід страхових випадків, підмінне авто, Драйвер ТО, СТО, Доступ в комʼюніті Drivovo Pride, Дисконтний клуб Drivovo Loyalty, Trade IN твого старого авто) </span>
          <span className={`${styles.tableItem} spacing`}>
          $ {
            //parseInt(ownerThreeYearsCost * 0.13 / 36).toFixed(0)
          parseFloat((parseFloat(drivovoPrice) / 36).toFixed(0) ) - 
          parseFloat ( (parseFloat(ownerThreeYearsCost) / 36).toFixed(0) ) - 3
          }
          </span> 
        </div>
       
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Вартість підписки на місяць</span>
          <span className={`${styles.tableItem} spacing`}>
            
            ${pricePerMonthStandart}* 
         
          </span>
        </div>

      </div>

      
      <div className="bloquote">*Вартість підписки, наведена вище — це лише початок розмови. Ми готові працювати над оптимальним рішенням в рамках твого бюджету.</div>


    

      {/* <div className=" additionaldescrBlock">Автомобіль може бути зручним, але як інвестиція він так собі. Вкладай в бізнес або обери фінансові інструменти, які можуть сприяти росту вартості власного капіталу мінімум на 7% на рік.</div> */}


      <div className={styles.divider}></div>

      
    

   

<div className={styles.divider}></div>
<div className={styles.divider}></div>

</div>
      {/* ==================================================================================== */}

      <div className={styles.hbsp_box}>
        <div className={styles.hbsp_box_img}>
          <img src={changedCar?.properties.hubspot_cover.files[0]?.file?.url} alt="" />
        </div>
       
        {changedCar?.properties.hubspot_form.rich_text[0]?.plain_text && <HubspotContactForm id={changedCar?.properties.hubspot_form.rich_text[0]?.plain_text} />}
            
      </div>

      
      


      <div className="ApiWrap">
      {/* <h2 className="bigTitle">Що входить в деталі підписки від Drivovo</h2> */}
      <h2 className="customH2">ВСЯ ПРАВДА про вартість володіння автомобілем при купівлі самостійно за кеш, про яку не скаже автодилер</h2>
      {/* <div className=" additionaldescrBlock">Новий автомобіль обійдеться тобі дорожче, ніж ти думав. Вартість володіння - це всі складові витрати користування новим авто за 3 роки.</div> */}
    
     
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <span className={styles.tableTitle}>
            {changedCar?.properties?.Name?.title[0]?.plain_text}
          </span>
          <span className={styles.tableTitle}>Кеш</span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість авто в салоні</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.car_price_ex_showroom.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Пенсійний фонд</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.pension_fund.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>КАСКО перший рік</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.insurance_1_year.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Автоцивілка перший рік</span>
          <span className={`${styles.tableItem} spacing`}>
            {" "}
            $ {numberWithCommas(changedCar?.properties.osago.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Реєстрація авто</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.registration.formula.number.toFixed(2))}
          </span>
        </div>
        {numberWithCommas(changedCar?.properties.luxury_tax.number.toFixed(2)) > 0 && (
          <div className={styles.tableRow}>
          <span className={styles.tableItem}>Податок на розкіш</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.luxury_tax.number.toFixed(2))}
          </span>
        </div>
        )}
        
        {/* <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Балансова вартість автомобіля</span>
          <span className={`${styles.tableItem} spacing`}>
            $ 
            {numberWithCommas(
              (
                parseInt(changedCar?.properties.car_price_ex_showroom.number) +
                parseFloat(changedCar?.properties.pension_fund.formula.number.toFixed(2)) +
                parseFloat(changedCar?.properties.insurance_1_year.formula.number) +
                parseFloat(changedCar?.properties.registration.formula.number) +
                parseFloat(changedCar?.properties.luxury_tax.number)
              ).toFixed(2),
            )}
          </span>
        </div> */}
        {/* ==================================================================================== */}
       
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Комплект гуми</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.tires.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Килимки</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.carpets.number.toFixed(2))}
          </span>
        </div>
        
        
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Бронеплівка</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.armored_film.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Початкові вкладення в автомобіль</span>
          <span className={styles.tableItem}>${numberWithCommas(startFund)}</span>
        </div>
        {/* ==================================================================================== */}

        <div className={styles.tableRow}>
          <span className={styles.tableItem}>КАСКО другий та третій рік</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.insurance_2_year.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>ТО за три роки</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.maintenance.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Автоцивілка другий та третій рік </span>
          <span className={`${styles.tableItem} spacing`}>
            {" "}
            $ {numberWithCommas(changedCar?.properties.osago_2_year.formula.number.toFixed(2))}
          </span>
        </div>
        {numberWithCommas(changedCar?.properties.luxury_tax_2_years.number.toFixed(2)) > 0 && (
          <div className={styles.tableRow}>
          <span className={styles.tableItem}>Податок на розкіш другий та третій рік</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.luxury_tax_2_years.number.toFixed(2))}
          </span>
        </div>
        )}
        
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Шиномонтаж та зберігання за 3 роки</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(changedCar?.properties.tire_service.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість власного капіталу за 3 роки (7%)</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas(((startFund / 100) * 21).toFixed(2))}
          </span>
        </div>
        {/* ==================================================================================== */}
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Вартість володіння автомобілем за 3 роки</span>
          <span className={styles.tableItem}>${numberWithCommas(ownerThreeYearsCost)}</span>
        </div>

        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість володіння автомобілем на місяць </span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas((ownerThreeYearsCost / 36).toFixed(2))}{" "}
          </span>
        </div>
      </div>
      
     
      <h2 className="customH2">Порівняння купівлі авто за кеш VS підписка Drivovo</h2>
      
  
      <div className={` ${styles.tableTrio}`}>
        <div className={styles.tableRow}>
          <span></span>
          <span className={styles.tableTitle}>Кеш</span>
          <span className={styles.tableTitle}>Drivovo</span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Початкові вкладення</span>
          <span className={`${styles.tableItem} spacing`}>$ {numberWithCommas(startFund)}</span>
          <span className={`${styles.tableItem} ${styles.accentCell} spacing`}>
            $ 
            {numberWithCommas((parseFloat(pricePerMonthStandart) + parseFloat(garanty)).toFixed(0))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Експлуатаційні витрати за 3 роки</span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas((ownerThreeYearsCost - startFund).toFixed(0))}
          </span>
          <span className={styles.tableItem}>Враховані в підписку</span>
        </div>

        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість викупу через 3 роки</span>
          <span className={`${styles.tableItem} spacing`}>$ 0,0</span>
          <span className={`${styles.tableItem} spacing`}>$ {numberWithCommas(lastPayment.toFixed(0))}</span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість володіння через 3 роки</span>
          <span className={`${styles.tableItem} spacing`}>$ {numberWithCommas(ownerThreeYearsCost)}</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(parseInt(drivovoPrice).toFixed(0))}
          </span>
        </div>

        {/* ==================================================================================== */}
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Вартість володіння в місяць </span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas((parseFloat(ownerThreeYearsCost) / 36).toFixed(2))}
          </span>
          <span className={`${styles.tableItem} spacing`}>
            $ {numberWithCommas((parseFloat(drivovoPrice) / 36).toFixed(0))}
          </span>
        </div>
      </div>

      
    </div>


     <div className={styles.infiPanel}>
        <h3>
          Різниця вартості володіння купівля/підписка за 3 роки <span>12.62%</span>
        </h3>
         {/* <p>
          Або <span>{getCostPerDay()}</span> грн на день — це як пригостити обідом друга😋
        </p>  */}
      </div>




      {/* <h2 className="ta-left">Графік платежів</h2>
      <div className={styles.descrBlockInner}>
        <p>
          {" "}
          Платіжні графіки, наведені нижче — це лише початок розмови. Ми готові працювати над ними
          разом з тобою.
        </p>
      </div>

      <div className={styles.mobileTabs}>
        <button className={styles.tab} onClick={() => handleTabs("t1")} ref={btn1}>
          Стандартний графік
        </button>
        <button className={styles.tab} onClick={() => handleTabs("t2")} ref={btn2}>
          Персональний 1
        </button>
      
      </div> */}
     
     {openPopupCarDinamic && <HubspotPopupDinamic id={changedCar?.properties.hubspot_form.rich_text[0]?.plain_text}/>}
    </>
  );
})

export default Calculator;