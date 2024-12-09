import './PrintFooter.css'

function PrintFooter(props) {
    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
    return (
        <div id='print-footer' className='print-only'>
            <div>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
            <div>Store: {props.response.store.number}</div>
            <div>Register: {props.response.register.number}</div>
            <div>Transaction Number: {props.response.register.lastTxnNumber + 1}</div>
            <div>Date: {dateString}</div>
            <div>Time: {timeString}</div>
            <div>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
        </div >
    )
}

export default PrintFooter
