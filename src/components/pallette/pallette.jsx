import React from 'react';
import styles from './pallette.module.css';

const Pallette = (props) => {
    const colors = ["#4285F3", "#DA4537", "#F3B500", "#0D9D58", "#2D2D2D"];

    return (
        <section className = {styles.pallette}>
            <div className = {styles.colors}>
                {
                    colors.map(color => <div color={color}>1</div>)
                }
            </div>
            <input type="text"/>
        </section>
    );
}

export default Pallette;