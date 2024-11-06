import './StatusBar.css'

function StatusBar(props) {
    return (
        <div id='status-bar'>
            <div className='container'>Store: {props.store.name}</div>
            <div className='container'>Register: {props.register.number}</div>
            <div className='container'>Transaction: {props.register.lastTxnNumber + 1}</div>
            <div className='container'>Status: {props.register.status}</div>
        </div>
    )
}

export default StatusBar
