import { useState } from 'react'
import './Keyboard.css'

function Keyboard(props) {
    const tap = (evt) => {
        const node = props.lastInputFocused.target;
        const character = evt.target.innerHTML;
        const text = '' + node.value;
        if (character === 'DEL') {
            node.value = text.substr(0, text.length - 1);
        } else if (newValue === 'SPACE') {
            node.value = text + ' ';
        } else {
            node.value = text + character;
        }
        node.focus();

    }
    return (
        <div id='keyboard' className='container'>
            <div>
                <button onClick={tap}>1</button>
                <button onClick={tap}>2</button>
                <button onClick={tap}>3</button>
                <button onClick={tap}>4</button>
                <button onClick={tap}>5</button>
                <button onClick={tap}>6</button>
                <button onClick={tap}>7</button>
                <button onClick={tap}>8</button>
                <button onClick={tap}>9</button>
                <button onClick={tap}>0</button>
                <button onClick={tap}>DEL</button>
            </div>
            <div>
                <button onClick={tap}>Q</button>
                <button onClick={tap}>W</button>
                <button onClick={tap}>E</button>
                <button onClick={tap}>R</button>
                <button onClick={tap}>T</button>
                <button onClick={tap}>Y</button>
                <button onClick={tap}>U</button>
                <button onClick={tap}>I</button>
                <button onClick={tap}>O</button>
                <button onClick={tap}>P</button>
            </div>
            <div>
                <button onClick={tap}>A</button>
                <button onClick={tap}>S</button>
                <button onClick={tap}>D</button>
                <button onClick={tap}>F</button>
                <button onClick={tap}>G</button>
                <button onClick={tap}>H</button>
                <button onClick={tap}>J</button>
                <button onClick={tap}>K</button>
                <button onClick={tap}>L</button>
            </div>
            <div>
                <button onClick={tap}>Z</button>
                <button onClick={tap}>X</button>
                <button onClick={tap}>C</button>
                <button onClick={tap}>V</button>
                <button onClick={tap}>B</button>
                <button onClick={tap}>N</button>
                <button onClick={tap}>M</button>
                <button onClick={tap}>,</button>
                <button onClick={tap}>.</button>
                <button onClick={tap} style={{ width: '10%' }}>SPACE</button>
            </div>
        </div>

    )
}

export default Keyboard
