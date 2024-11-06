import './AuditLog.css'

function AuditLog(props) {
    return (
        <div id='audit-log' className='document container'>
            {props.auditLog.map((line, i) => {
                return line ? <div key={i}>{line}</div> : <br key={i} />;
            })}
        </div>
    )
}

export default AuditLog
