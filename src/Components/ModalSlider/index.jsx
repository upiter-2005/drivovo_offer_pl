import React, {useEffect, useState, useRef, useCallback} from "react";
import styles from "./ModalSlider.module.scss"
import debounce from "lodash.debounce";
import {useSelector, useDispatch} from "react-redux";
import { closeModalSlider } from "../../redux/slices/carsSlice";

import Slider from "react-slick";


function SampleNextArrow(props) {
    const {  onClick } = props;
    return (
      <div
        className="nextArrow"
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
      className="prevArrow"
        onClick={onClick}
      > <img src="/img/sl-left.png" alt="" /></div>
    );
  }

const ModalSlider = ({images}) => {
  const sliderRef = useRef();
  const sliderWindow = useRef();
  const dispatch = useDispatch();
  const isModalSlider = useSelector(state => state.cars.isModalSlider);


  // const [nav1, setNav1] = useState(null);
  // const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    // setNav1(sliderRef1);
    // setNav2(sliderRef2);
  }, []);

  const onWheelSlider = useCallback(
    debounce((e) => {
      if (!sliderRef1.current) return;
      if (e.deltaX > 0) {
        sliderRef1.current.slickNext();
      } else if (e.deltaX < 0) {
        sliderRef1.current.slickPrev();
      }
    }, 20), [],);


    useEffect(() => {
      if(sliderWindow && sliderWindow.current){
        document.body.addEventListener('keydown', detectKeyboard, true);
        // sliderRef1?.focus();
      }

      return () => {
        document.body.removeEventListener('keydown', detectKeyboard, true);
      };

    }, []);

    const detectKeyboard = (e) =>{
      if(e.key === "ArrowRight"){
        sliderRef1.current.slickNext();
      }
      if(e.key === "ArrowLeft"){
        sliderRef1.current.slickPrev();
      }
      console.log(e.key);
    }

      
    const topSlider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // adaptiveHeight: true,
        // variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
        // beforeChange: (current, next) => {
        //   setActiveNumSlide(state=> next + 1 ); 
        //   console.log( next );
        // }
      };

    //   const opt2 = {
    //     nextArrow: <SampleNextArrow />,
    //     prevArrow: <SamplePrevArrow />
    //   }
     
       


    return (
        <div className={isModalSlider ? `${styles.modalForm} ${styles.modalFormActive}` :  `${styles.modalForm}`} ref={sliderWindow}>
            <div className={styles.modalFormWrapper} >
                <div className={styles.close} onClick={() => dispatch(closeModalSlider())}>×</div>
                <div className="full-slider-wrap"
                 onWheel={onWheelSlider}
                 >

                  <Slider 
                  {...topSlider} 
                  className="modalCarousel" 
                  ref={sliderRef1}
                  //asNavFor={nav2} !!!!!
                  //ref={slider => (sliderRef1 = slider)} !!!!!!
                  >
                        
                      {images?.map((img, idx) => (
                        <div  key={idx}
                         //style={{ width: "100%" }} 
                         className="modalCarousel_Item"
                         >
                          <img src={img.file.url} alt={img} className={styles.sliderTopImg}  />
                        </div>
                      ))}
                  </Slider>
                </div>

                {/* <div className="thumbnail-slider-wrap">

                
                    <Slider
                   
                        asNavFor={nav1}
                        ref={slider => (sliderRef2 = slider)}
                        slidesToShow={4}
                        infinite={false}
                        swipeToSlide={true}
                        focusOnSelect={true}
                       
                       // centerMode={true}
                    >
                       {images?.map((img, idx) => (
                        <div  key={idx}  >
                            <img src={img.file.url} alt={img}   />
                        </div>
                        ))}
                    </Slider>

            </div> */}

            
            </div>
            
        </div>
    );


}

export default ModalSlider;