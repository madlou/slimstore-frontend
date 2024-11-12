import { useRef, useEffect } from 'react'
import './Basket.css'

function Basket(props) {
    let total = 0;
    let lines = 0;
    let items = 0;
    props.basket.map((line, i) => {
        total += line.quantity * line.unitValue;
        items += line.quantity;
        lines++;
    })
    const totalRef = useRef(null);
    const scrollToBottom = () => {
        totalRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    useEffect(() => {
        setTimeout(() => {
            scrollToBottom()
        }, 100)
    }, [props.basket]);
    return (
        <div id='basket' className='document container'>
            {props.basket.map((line, i) => {
                return (
                    <div key={i} className='space-below'>
                        <div>{line.code} {line.name}</div>
                        <div className='total'>£{(line.quantity * line.unitValue).toFixed(2)}</div>
                        <div className='unit'>{line.quantity} @ £{line.unitValue.toFixed(2)}</div>
                    </div>
                );
            })}
            <div>
                <div>Total: £{total.toFixed(2)}</div>
                <div>Transaction Lines: {lines}</div>
                <div ref={totalRef}>Total Items: {items}</div>
            </div>
        </div>
    )
}

export default Basket
