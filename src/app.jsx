import Pallette from './components/pallette/pallette';
import Canvas from './components/canvas/canvas';
import styles from './app.module.css';
import { useRef, useState } from 'react';

function App({colors}) {
  const [color, setColor] = useState('white');
  const [text, setText] = useState("");

  const imageRef = useRef();

  const updateText = (changedText) => {
    setText(changedText);
    const canvas =  document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,640,360);
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.font = "38px Do Hyeon";
    ctx.fillStyle = color;
    ctx.fillRect(0,0,640,360);
    drawImage();
    ctx.fillStyle = 'black';
    ctx.fillText(changedText, 320, 180);
  }

  const selectBackground = (e) => {
    const changedColor = e.target.getAttribute('color');
    setColor(changedColor);
    const canvas =  document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = changedColor;
    ctx.fillRect(0,0,640,360);
    ctx.fillStyle = 'black';
    ctx.fillText(text, 320, 180);
  }
  const downloadImage = () => {
    const canvas = document.querySelector("canvas");
    const img = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = img;
    link.download = true;
    link.click();
  }

  const drawImage = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const scale = Math.max(canvas.width / imageRef.current.width, canvas.height / imageRef.current.height);
    const x = (canvas.width / 2) - (imageRef.current.width / 2) * scale;
    const y = (canvas.height / 2) - (imageRef.current.height / 2) * scale;
    ctx.drawImage(imageRef.current, x, y, imageRef.current.width * scale, imageRef.current.height * scale);
  }
  
  const selectImage = (url) => {
    imageRef.current.src = url;
    console.log(imageRef.current);
  }
  
  return (
    <div className={styles.container}>
      <section className={styles.canvas_container}>
        <img ref = {imageRef} src="" alt="" onLoad={drawImage} style={{display: "none"}} width="640" height="360"/>
        <Canvas color={color}/>
        <button className={styles.download} onClick={downloadImage}>다운로드</button>
      </section> 
      <section className = {styles.pallette_container}>
        <Pallette colors= {colors} onChangeText={updateText} onSelectColor={selectBackground} onSelectImage={selectImage}/>
      </section>
    </div>
  );
}

export default App;
