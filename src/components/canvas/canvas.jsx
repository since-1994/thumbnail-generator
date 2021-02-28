import React from 'react';
import styles from './canvas.module.css';

const Canvas = ({color}) => {
    console.log(color);
    return (
        <canvas className={styles.canvas} id="tutorial" width="640" height="360" style={{background: color}}></canvas> 
    );
}

export default Canvas;