import { useState, useEffect } from "react";
import styles from "./List.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hidePreloader } from "../../redux/slices/carsSlice";

export default function List() {
  const [cars, setCars] = useState([]);
  const dispatch = useDispatch();
  const [activeCars, setActiveCars] = useState([]);

  const numberWithCommas = (x) => {
    if (x) {
      x = x.toString();
      var pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
      //console.log(x);
      return x;
    }
    return;
  };

  const getCars = async () => {
    try {
      console.log(process.env.REACT_APP_PROXY);
      const { data } = fetch(`${process.env.REACT_APP_PROXY}/cars`)
        .then((res) => res.json())
        .then((res) => {
          setCars(res.data.results);
          if(res.data.results){
            setTimeout(()=>{dispatch(hidePreloader());}, 1000) 
          }
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
   
    const tempArr = cars.filter( obj=> obj.properties.Status_avto.select?.name !== "disable");
    setActiveCars(tempArr)

    getCars();
  }, [cars]);

  return (
    <div className={styles.list}>
      <div>
        <span>Model</span>
        <span>Offer link</span>
        <span>Price</span>
      </div>
      {activeCars?.map((obj, i) => (
        <div key={obj.url}>
          <a href={obj.url} target="blank">
            {i + 1}. {obj.properties.Name.title[0]?.plain_text}
          </a>
          <Link to={`/offer/${obj.id}`}>Link To Offer</Link>
          <span>$ {numberWithCommas(obj.properties.car_price_ex_showroom?.number)}</span>
        </div> 
      ))}
    </div>
  );
}
