import React, {useEffect} from "react";
import styles from "./HubspotPopupDinamic.module.scss"
import {useSelector, useDispatch} from "react-redux";
import { closeDinamic } from "../../redux/slices/carsSlice";

const HubspotPopupDinamic = ({id}) => {
    const dispatch = useDispatch();
    const popupTopFormImage = useSelector(state => state.cars.popupTopFormImage);

    useEffect(() => {
        let formId = id;
        const script = document.createElement('script');
        script.src='https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    portalId: '20308897',
                    formId ,
                    target: '#dinamoForm'
                })
            }
        });
    }, []);

    {console.log(id);}

    return (
        <div className={styles.modalForm}>
        <div className={styles.modalFormWrapper}>
            <img src={popupTopFormImage || `/img/popupImg.webp`} alt=""  className={styles.abs}  />
            <div className={styles.close} onClick={() => dispatch(closeDinamic())}>×</div>
                <p className={styles.title}>Завантажити графік платежів</p>
            <div id="dinamoForm" ></div>
        </div>
    </div>

   
    );

}

export default HubspotPopupDinamic;