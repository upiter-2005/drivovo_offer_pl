import React, {useEffect} from "react";
import styles from "./ModalForm.module.scss"
import {useSelector, useDispatch} from "react-redux";
import { closeModalForm } from "../../redux/slices/carsSlice";

const ModalForm = () => {

    const dispatch = useDispatch();
    const popupTopFormImage = useSelector(state => state.cars.popupTopFormImage);

    useEffect(() => {
        const script = document.createElement('script');
        script.src='https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @TS-ignore
            if (window.hbspt) {
                // @TS-ignore
                window.hbspt.forms.create({
                    portalId: '20308897',
                    formId: '3207ba31-5865-4630-81b5-407c8e0fe156',
                    target: '#modalForm'
                })
            }
        });
    }, []);

    return (
        <div className={styles.modalForm}>
            <div className={styles.modalFormWrapper}>
                <img src={popupTopFormImage || `/img/popupImg.webp`} alt=""  className={styles.abs}  />
                <div className={styles.close} onClick={() => dispatch(closeModalForm())}>×</div>
                    <p className={styles.title}>Замовити тест-драйв</p>
                <div id="modalForm" ></div>
            </div>
        </div>
    );

}

export default ModalForm;