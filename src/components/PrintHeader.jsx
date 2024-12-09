import './PrintHeader.css'

function PrintHeader(props) {
    return (
        <div id='print-header' className='print-only'>
            <div>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
            <h1>{props.response.uiTranslations.logo}</h1>
            <div>{props.response.store.name}</div>
            <div>{props.response.store.address1}</div>
            <div>{props.response.store.address2}</div>
            <div>{props.response.store.city}</div>
            <div>{props.response.store.postCode}</div>
            <div>{props.response.store.countryCode}</div>
            <div>{props.response.store.phoneNumber}</div>
            <div>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
        </div>
    )
}

export default PrintHeader
