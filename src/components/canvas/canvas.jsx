import React, { useEffect, useRef } from 'react';
import styles from './canvas.module.css';

const Canvas = ({color, backgroundImg}) => {
    const canvasRef = useRef();

    const drawImage = () => {
        console.log(backgroundImg);
        if(backgroundImg){
            const ctx = canvasRef.current.getContext('2d');
            const scale = Math.max(canvasRef.current.width / backgroundImg.width, canvasRef.current.height / backgroundImg.height);
            const x = (canvasRef.current.width / 2) - (backgroundImg.width / 2) * scale;
            const y = (canvasRef.current.height / 2) - (backgroundImg.height / 2) * scale;
            ctx.drawImage(backgroundImg, x, y, backgroundImg.width * scale, backgroundImg.height * scale);
        }
    }
    drawImage();

    return (
        <canvas className={styles.canvas} ref={canvasRef} id="canvas" width="640" height="360" style={{background: color}}></canvas> 
    );
}

export default Canvas;