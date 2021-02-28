import React, { useRef } from 'react';
import styles from './pallette.module.css';

const Pallette = ({colors, onChangeText, onSelectColor}) => {
    const inputRef = useRef();

    const updateText = e => {
        onChangeText(inputRef.current.value);
    }

    return (
        <section className = {styles.pallette}>
            <div className = {styles.colors}>
                {
                    colors.map(color => <div className={`${styles.color} color-selector`} color={color} onClick={onSelectColor}></div>)
                }
            </div>
            <input ref = {inputRef} className={styles.text} type="text" onChange={updateText}/>
            <input className={styles.file} type="file"/>
        </section>
    );
}
export default Pallette;