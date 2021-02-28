import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import App from './app';

const colours = ["#4285F3", "#DA4537", "#F3B500", "#0D9D58", "#2D2D2D"];

ReactDOM.render(
  <React.StrictMode>
    <App colors={colours}/>
  </React.StrictMode>,
  document.getElementById('root')
);


const colors = document.querySelectorAll('.color-selector');
colors.forEach(color => {
    color.style.backgroundColor = color.getAttribute('color');
})
