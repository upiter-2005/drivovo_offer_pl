import {React, useState} from 'react'
import styles from "./Modal.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slices/carsSlice"

export default function Modal({currentIndex, images, idx}) {
    const dispatch = useDispatch();
    console.log(idx);
  return (
    <div className={styles.modal} onClick={() => {dispatch(closeModal())}}>
        <div className={styles.modalInner} onClick={e => e.stopPropagation()}>
            {images?.map((obj, i) => 
            // console.log(obj)
                <img src={obj.file.url} alt="" key={i} className={idx === i && `${styles.activeImg}`}  />
            )}
        </div>
    </div>
  )
}
