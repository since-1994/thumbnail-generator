import React, { useRef } from 'react';
import styles from './pallette.module.css';

const Pallette = ({colors, onChangeText, onSelectColor, onSelectImage}) => {
    const textRef = useRef();
    const imageRef = useRef();
    const canvasRef = useRef();

    const image = new Image();
    let iCropLeft, iCropTop, iCropWidth, iCropHeight;
    let scale;
    image.onload = () => {
        const ratio = image.height / image.width;
        scale = 350/image.width;
        canvasRef.current.width = image.width * scale;
        canvasRef.current.height = image.width * scale * ratio;

        iCropLeft = canvasRef.current.width/10;
        iCropTop = canvasRef.current.width/10;
        iCropWidth = iCropLeft + 160;
        iCropHeight = iCropTop + 90;

        drawCropRect();
        AddCropMoveEvent();
    };    

    const updateText = e => {
        onChangeText(textRef.current.value);
    }

    const updateImage = e => {
        image.src = URL.createObjectURL(imageRef.current.files[0])
    }


    const drawCropRect = () => {
        const ctx = canvasRef.current.getContext("2d");

        ctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, canvasRef.current.width, canvasRef.current.height );

        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect( iCropLeft, iCropTop, iCropWidth, iCropHeight );
        ctx.stroke();
    }
        
    const AddCropMoveEvent = () => {
        let bDrag = false;
        let iOldX, iOldY;
        let iCropLeftOld, iCropTopOld;

        canvasRef.current.onmousedown = function(e){
            bDrag = true;
            iOldX = e.clientX;
            iOldY = e.clientY;
            iCropLeftOld = iCropLeft;
            iCropTopOld = iCropTop;
            onSelectImage(iCropLeft/scale, iCropTop/scale, iCropWidth/scale, iCropHeight/scale, image);
        };


        canvasRef.current.onmousemove = (e) => {
            if( bDrag == false ) return;

            var iX = e.clientX - iOldX;
            var iY = e.clientY - iOldY;

            iCropLeft = iCropLeftOld + iX;
            iCropTop = iCropTopOld + iY;

            if( iCropLeft < 0 ){
                iCropLeft = 0;
            }
            if( iCropTop < 0 ){
                iCropTop = 0;
            }
            if(iCropTop + iCropHeight > canvasRef.current.height){
                iCropTop = canvasRef.current.height - iCropHeight;
            }
            if(iCropLeft + iCropWidth > canvasRef.current.width){
                iCropLeft = canvasRef.current.width - iCropWidth;
            }
            drawCropRect();
            onSelectImage(iCropLeft/scale, iCropTop/scale, iCropWidth/scale, iCropHeight/scale, image);
        };

        canvasRef.current.onmouseup = function(e){
            bDrag = false;
        };
        canvasRef.current.onmouseleave = () => {
            bDrag = false;
        }
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
            <canvas ref = {canvasRef} ></canvas>
        </section>
    );
}
export default Pallette;