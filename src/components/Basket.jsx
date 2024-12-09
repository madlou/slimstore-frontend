import { useRef, useEffect } from 'react'
import './Basket.css'

function Basket(props) {
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    props.basket.map((line, i) => {
        total += line.quantity * line.unitValue * (line.type == 'RETURN' ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    props.tender.map((line, i) => {
        tenders += line.value;
    })
    if (tenders != 0) {
        difference = tenders - total;
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
                        <div className='total'>{props.uiTranslations.currencySymbol}{(line.quantity * (line.type == 'RETURN' ? -1 : 1) * line.unitValue).toFixed(2)}</div>
                        <div className='unit'>{line.quantity * (line.type == 'RETURN' ? -1 : 1)} @ {props.uiTranslations.currencySymbol}{line.unitValue.toFixed(2)}</div>
                    </div>
                );
            })}
            {props.basket.length < 1 ? "" : (
                <div className='space-below'>
                    <div>{props.uiTranslations.subtotal}: {props.uiTranslations.currencySymbol}{total.toFixed(2)}</div>
                    <div>{props.uiTranslations.transactionLines}: {lines}</div>
                    <div>{props.uiTranslations.items}: {items}</div>
                </div>
            )}
            {props.tender.map((line, i) => {
                return <div key={i} className='tender'>
                    <div>{line.label} {props.uiTranslations.currencySymbol}{(line.value).toFixed(2)}</div>
                </div>
            })}
            {tenders == 0 ? "" : (
                <div className='space-above'>
                    <div>{props.uiTranslations.tenderTotal}: {props.uiTranslations.currencySymbol}{tenders.toFixed(2)}</div>
                </div>
            )}
            {tenders == 0 || difference == null ? "" : (
                <div className='space-above no-print'>
                    <div>{props.uiTranslations.difference}: {props.uiTranslations.currencySymbol}{difference.toFixed(2)}</div>
                </div>
            )}
            <div ref={basketBottomRef} id='bottomReference'></div>
            {
                props.name == 'LOGIN' ? (
                    <div>
                        <p>{props.uiTranslations.devmessage1}</p>
                        <p>{props.uiTranslations.devmessage2}</p>
                        <table className="table-with-borders"><tbody>
                            <tr><td>{props.uiTranslations.user}</td><td>{props.uiTranslations.password}</td><td>{props.uiTranslations.role}</td></tr>
                            <tr><td>1111</td><td>1234</td><td>{props.uiTranslations.associate}</td></tr>
                            <tr><td>2222</td><td>1234</td><td>{props.uiTranslations.manager}*</td></tr>
                            <tr><td>3333</td><td>1234</td><td>{props.uiTranslations.administrator}**</td></tr>
                        </tbody></table>
                        <p><i>* {props.uiTranslations.devmessage3}</i></p>
                        <p><i>** {props.uiTranslations.devmessage4}</i></p>
                    </div>
                ) : ""
            }
            {
                props.name == 'REGISTER_CHANGE' ? (
                    <div>
                        <p>{props.uiTranslations.devmessage1}</p>
                        <p>{props.uiTranslations.devmessage2}</p>
                        <table className="table-with-borders"><tbody>
                            <tr><td>{props.uiTranslations.store}</td><td>{props.uiTranslations.register}</td></tr>
                            <tr><td>423</td><td>1</td></tr>
                            <tr><td>423</td><td>2</td></tr>
                            <tr><td>423</td><td>3</td></tr>
                        </tbody></table>
                    </div>
                ) : ""
            }
        </div >
    )
}

export default Basket
