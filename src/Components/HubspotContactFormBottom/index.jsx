import React, {useEffect} from "react";
import styles from "./HubspotContactFormBottom.module.scss"

const HubspotContactFormBottom = () => {
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
                    formId: '76cf1904-f0ee-4467-a382-6fb7f5842e9c',
                    target: '#hubspotFormBottom'
                })
            }
        });
    }, []);

    return (
        <div className={styles.hbfContainer}>
            <p className={styles.title}>Замовити тест-драйв</p>
            <div id="hubspotFormBottom" className={styles.hubspotForm}></div>
        </div>
    );

}

export default HubspotContactFormBottom;