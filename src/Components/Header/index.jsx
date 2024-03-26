import {useEffect, useState, memo} from "react";
import styles from "./Header.module.scss"
import { Link } from "react-router-dom";
import { openMobMnu, openModalForm} from "../../redux/slices/carsSlice"
import {useDispatch, useSelector} from "react-redux";


 const Header = memo(function Header() {
    const [cars, setCars] = useState([]);
    const [activeCars, setActiveCars] = useState([]);
    const mobMnu = useSelector(state=>state.cars.mobMnu);
   
    const dispatch = useDispatch();


    const getCars = async () => {
      // if(cars){return false;}
        try {
          console.log(process.env.REACT_APP_PROXY);
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
        setActiveCars(tempArr)
    
        getCars();
      }, []);

useEffect(()=>{
  console.log('cars update');
}, [cars])
console.log(cars);

  return (
    <>
  
      <header>
      
        <div className={styles.header}>
                <Link to="https://drivovo.com" className={styles.logo}><img src="/img/main-logo.svg" alt="" /></Link>
                <a href="#"><img src="/img/bar.svg" className={styles.bar} alt="" onClick={()=> dispatch(openMobMnu(false))} /></a>
                <div className={styles.rightHeader}>
                    <ul>
                    
                        <li className={styles.parentLi} key="hItem1">
                          <a href="/">Автопарк 
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                            <path d="M5.33215 9.24441L0.996666 4.90891C0.78757 4.69981 0.78757 4.36081 0.996666 4.15174L1.50233 3.64608C1.71107 3.43734 2.04938 3.43693 2.25861 3.64518L5.71074 7.08114L9.16286 3.64518C9.37209 3.43693 9.71039 3.43734 9.91913 3.64608L10.4248 4.15174C10.6339 4.36084 10.6339 4.69983 10.4248 4.90891L6.08934 9.24441C5.88024 9.45349 5.54124 9.45349 5.33215 9.24441Z" fill="#23262A"/>
                          </svg>
                            </a>
                            <ul className={styles.childMnu}>
                            {cars?.filter(obj => obj.properties?.Footer?.select?.name === "+").map((obj, i) =>
                             <li key={i}><Link to={`/offer/${obj.properties.URL.rich_text[0]?.plain_text}`} key={obj.url}>{obj.properties.car_name.rich_text[0].plain_text}</Link></li>)}
                               
                                
                              
                            </ul>
                        </li>
                        <li key="hItem23"><a href="https://drivovo.com/outlet/">Outlet</a></li>
                    <li key="hItem24"><a href="https://drivovo.com/beta-test/">Beta-test</a></li>
                        <li key="hItem2"><a href="https://drivovo.com/blog/">Блог</a></li>
                        <li key="hItem3"><a href="https://drivovo.com/questions/">FAQ</a></li>
                        <li key="hItem4"><a href="https://drivovo.com/kontakty/">Контакти</a></li>
                    </ul>
                    <a href="/" 
                    className={styles.headerBtn} 
                    onClick={(e)=>{e.preventDefault(); dispatch(openModalForm())}}
                    
                    >Хочу тест-драйв</a>
                </div>
            </div>
    </header>
    </>
  
    
  )
})
export default Header;