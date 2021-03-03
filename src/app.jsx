import Pallette from './components/pallette/pallette';
import Canvas from './components/canvas/canvas';
import styles from './app.module.css';
import { useRef, useState } from 'react';

function App({colors}) {
  const [color, setColor] = useState('white');
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

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
    // drawImage();
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
  
  const selectImage = (url) => {
    console.log(url);
    const img = new Image();
    img.onload = ()=>setImage(img);
    img.src = url;
  }

  const cropImage = (left, top, width, height, uploadedImg) => {
    console.log(uploadedImg);
    const img = new Image();
    img.onload = function(){
      const canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage( img, left, top, width, height, 0, 0, canvas.width, canvas.height );
      console.log(text);
      ctx.fillStyle = 'black';
      ctx.fillText(text, 320, 180);
    };
    img.src = uploadedImg.src;
  }

  return (
    <div className={styles.container}>
      <section className={styles.canvas_container}>
        <Canvas color={color} backgroundImg={image}/>
        <button className={styles.download} onClick={downloadImage}>다운로드</button>
      </section> 
      <section className = {styles.pallette_container}>
        <Pallette colors= {colors} onChangeText={updateText} onSelectColor={selectBackground} onSelectImage={cropImage} />
      </section>
    </div>
  );
}

export default App;
