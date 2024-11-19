import { useRef, useEffect } from 'react'
import './Basket.css'

function Basket(props) {
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let change = null;
    props.basket.map((line, i) => {
        total += line.quantity * line.unitValue;
        items += line.quantity;
        lines++;
    })
    props.tender.map((line, i) => {
        tenders += line.value > 0 ? line.value : 0;
    })
    if (tenders >= total) {
        change = tenders - total;
    }
    const basketBottomRef = useRef(null);
    const scrollToBottom = () => {
        if (basketBottomRef.current) {
            basketBottomRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
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
            {props.basket.length < 1 ? "" : (
                <div className='space-below'>
                    <div>Sub Total: £{total.toFixed(2)}</div>
                    <div>Transaction Lines: {lines}</div>
                    <div>Total Items: {items}</div>
                </div>
            )}
            {props.tender.map((line, i) => {
                return line.value > 0 ? (
                    <div key={i} className='space-below'>
                        <div>{line.label} £{(line.value).toFixed(2)}</div>
                    </div>
                ) : "";
            })}
            {tenders == 0 ? "" : (
                <div className='space-below'>
                    <div>Tender Total: £{tenders.toFixed(2)}</div>
                </div>
            )}
            {tenders == 0 || tenders > total ? "" : (
                <div>
                    <div>To Pay: £{(total - tenders).toFixed(2)}</div>
                </div>
            )}
            {change == null || change <= 0 ? "" : (
                <div>
                    <div>Cash Change: £{change.toFixed(2)}</div>
                </div>
            )}
            <div ref={basketBottomRef}></div>
        </div>
    )
}

export default Basket
