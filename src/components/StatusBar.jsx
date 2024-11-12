import './StatusBar.css'

function StatusBar(props) {
    const pad = (value, width, character = '0') => {
        value = value + '';
        return value.length >= width ? value : new Array(width - value.length + 1).join(character) + value;
    }
    return (
        <div id='status-bar'>
            <div className='container'>Store-Register: {pad(props.store.number, 4)}-{pad(props.register.number, 2)}</div>
            <div className='container'>User: {props.user.name}</div>
            <div className='container'>Transaction: {pad(props.register.lastTxnNumber + 1, 6)}</div>
            <div className='container'>Status: {props.register.status}</div>
        </div>
    )
}

export default StatusBar
