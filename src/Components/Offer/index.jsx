/* eslint-disable no-template-curly-in-string */
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars, setBg, hidePreloader, showPreloader } from "../../redux/slices/carsSlice";
import {Helmet} from "react-helmet";
import Slider from "react-slick";
import styles from "./Offer.module.scss";
import debounce from "lodash.debounce";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Offer({data}) {
  //const [cars, setCars] = useState([]);
  const [changedCar, setChangedCar] = useState(null);
  const [images, setImages] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [startFund, setStartFund] = useState(0);
  const [ownerThreeYearsCost, setOwnerThreeYearsCost] = useState(null);
  const cars = useSelector((state) => state.cars.cars);
  const sliderRef = useRef();

  const dispatch = useDispatch();
  const startFundCount = () => {
    const result = (
      parseInt(changedCar?.properties.car_price_ex_showroom.number) +
      parseFloat(changedCar?.properties.pension_fund.formula.number.toFixed(2)) +
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

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <img src="img/rightAr.svg" alt="" />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <img src="img/rightAr.svg" alt="" />
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



  const numberWithCommas = (x) => {
    if (x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      return x;
    }
    return;
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

    
    setOwnerThreeYearsCost(result);
  };

 
  useEffect(() => {
    dispatch(getCars());
    setChangedCar(data)
  }, []);
  useEffect(() => {
    setChangedCar(data)
  }, [data]);
  useEffect(() => {
    const obj = cars?.find((el) => el.id ==="71c5cd0a-7282-44c8-87a6-0a2f6955b798");

    // eslint-disable-next-line no-lone-blocks
    {
      cars && setChangedCar(obj);
    }
    
    startFundCount();
    if(obj){
      setTimeout(()=>{dispatch(hidePreloader());}, 3000) 
    }
    
  }, [cars]);

  useEffect(() => {
    startFundCount();
    dispatch(setBg(changedCar?.properties.Cover.files[0].file.url));
    setImages(changedCar?.properties.Photo.files);
  }, [changedCar]);
  useEffect(() => {
    ownThreeYearsCount();
  }, [startFund]);

  // const handlerChange = (e) => {
   
  //   const currentCar = cars.find((obj) => obj.url === e.target.value);
  //   setChangedCar(currentCar);
  //   setImageIndex(0);
  //   setImages(currentCar.properties.Photo.files);
  // };

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

  return (
    <>
    {/* <Helmet>
        <title>{changedCar?.properties.Name.title[0].plain_text}</title> 
        <meta name="description" content={changedCar?.properties.Text.rich_text[0].text.content} />
        <meta property="og:title" content={changedCar?.properties.Name.title[0].plain_text} />
        <meta property="og:image" content={changedCar?.properties.Cover.files[0].file.url} />
        <meta property="og:description" content={changedCar?.properties.Text.rich_text[0].text.content} />
        
          
      </Helmet> */}
     

      <div className="offerDescr">
        <h2>{changedCar?.properties.Title.rich_text[0].plain_text}</h2>
        <div className="descrBlock">{changedCar?.properties.Text.rich_text[0].text.content}</div>
      </div>

      <div onWheel={onWheelSlider}>
        <Slider {...settings} ref={sliderRef}>
          {images?.map((img, idx) => (
            <div className={idx === imageIndex ? "slide activeSlide" : "slide"} key={idx}>
              <img src={img.file.url} alt={img} />
             
            </div>
          ))}
        </Slider>
      </div>

     
      <h2 className="ta-left">Вартість володіння автомобілем при купівлі за кеш</h2>
      <div className=" additionaldescrBlock">Новий автомобіль обійдеться тобі дорожче, ніж ти думав. Вартість володіння - це всі складові витрати користування новим авто за 3 роки.</div>
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <span className={styles.tableTitle}>
            {changedCar?.properties.Name.title[0].plain_text}
          </span>
          <span className={styles.tableTitle}>Кеш</span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість авто в салоні</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.car_price_ex_showroom.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Пенсійний фонд</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.pension_fund.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>КАСКО перший рік</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.insurance_1_year.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Автоцивілка перший рік</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.osago.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Реєстрація авто</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.registration.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Податок на розкіш</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.luxury_tax.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Балансова вартість автомобіля</span>
          <span className={styles.tableItem}>
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
        </div>

        {/* ==================================================================================== */}
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Тонування</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.tinted_glass.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Комплект гуми</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.tires.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Килимки</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.carpets.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Захисна сітка</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.safety_net.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Захист радіатора</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.radiator_protection.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Бронеплівка</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.armored_film.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Початкові вкладення в автомобіль</span>
          <span className={styles.tableItem}>${numberWithCommas(startFund)}</span>
        </div>
        {/* ==================================================================================== */}

        <div className={styles.tableRow}>
          <span className={styles.tableItem}>КАСКО другий та третій рік</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.insurance_2_year.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>ТО за три роки</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.maintenance.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Автоцивілка другий та третій рік </span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.osago_2_year.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Податок на розкіш другий та третій рік</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.luxury_tax_2_years.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Шиномонтаж та зберігання за 3 роки</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(changedCar?.properties.tire_service.formula.number.toFixed(2))}
          </span>
        </div>
        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість власного капіталу за 3 роки (7%)</span>
          <span className={styles.tableItem}>
            ${numberWithCommas(((startFund / 100) * 21).toFixed(2))}
          </span>
        </div>
        {/* ==================================================================================== */}
        <div className={styles.tableRowSubTitle}>
          <span className={styles.tableItem}>Вартість володіння автомобілем за 3 роки</span>
          <span className={styles.tableItem}>${numberWithCommas(ownerThreeYearsCost)}</span>
        </div>

        <div className={styles.tableRow}>
          <span className={styles.tableItem}>Вартість володіння автомобілем на місяць </span>
          <span className={styles.tableItem}>
            ${numberWithCommas((ownerThreeYearsCost / 36).toFixed(2))}{" "}
          </span>
        </div>
      </div>

      <div className=" additionaldescrBlock">Автомобіль може бути зручним, але як інвестиція він так собі. Вкладай в бізнес або обери фінансові інструменти, які можуть сприяти росту вартості власного капіталу мінімум на 7% на рік.</div>

      <iframe className="meetings-wrapper" src="https://drivovo.com/meetings2/"></iframe>
    </>
  );
}
