import './StatusBar.css'

function StatusBar(props) {
    const pad = (value, width, character = '0') => {
        value = value + '';
        return value.length >= width ? value : new Array(width - value.length + 1).join(character) + value;
    }
    return (
        <div id='status-bar'>
            <div className='container'><label>Store-Register: </label><span>{pad(props.store.number, 4)}-{pad(props.register.number, 2)}</span></div>
            <div className='container'><label>User: </label><span>{props.user.name}</span></div>
            <div className='container'><label>Transaction: </label><span>{pad(props.register.lastTxnNumber + 1, 6)}</span></div>
            <div className='container'><label>Status: </label><span>{props.register.status}</span></div>
        </div>
    )
}

export default StatusBar
