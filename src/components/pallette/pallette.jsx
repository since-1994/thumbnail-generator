import React, { useRef } from 'react';
import styles from './pallette.module.css';

const Pallette = ({colors, onChangeText, onSelectColor, onSelectImage}) => {
    const textRef = useRef();
    const imageRef = useRef();

    const updateText = e => {
        onChangeText(textRef.current.value);
    }

    const updateImage = e => {
        onSelectImage(URL.createObjectURL(imageRef.current.files[0]));
    }

    return (
        <section className = {styles.pallette}>
            <div className = {styles.colors}>
                {
                    colors.map(color => <div className={`${styles.color} color-selector`} color={color} onClick={onSelectColor}></div>)
                }
            </div>
            <input ref = {textRef} className={styles.text} type="text" onChange={updateText}/>
            <input ref = {imageRef} className={styles.file} type="file" onChange={updateImage}/>
        </section>
    );
}
export default Pallette;