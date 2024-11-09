import { useState, useEffect, useMemo } from 'react'
import Keyboard from './components/Keyboard.jsx'
import AuditLog from './components/AuditLog.jsx'
import Form from './components/Form.jsx'
import FunctionButtons from './components/FunctionButtons.jsx'
import StatusBar from './components/StatusBar.jsx'
import { postApi } from './api/postApi.js'
import { dataSpec } from './api/dataSpec.js'
import './App.css'

function App() {
    const [lastInputFocused, setLastInputFocused] = useState(null)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [data, setData] = useState(dataSpec)
    const [action, setAction] = useState('home')
    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    }
    const getData = async (action, formElements) => {
        setLastInputFocused(document.getElementById('input-1'));
        setData(await postApi().getData(action, formElements));
    }
    useEffect(() => {
        if (data && data.user.id) {
            console.log(data);
        }
    }, [data]);
    useEffect(() => {
        getData(action, data.flow.formElements);
    }, [action]);
    return (
        <>
            <div id='top'>
                <h1>TJX</h1>
                <h2>SlimStore POS - {data.flow.title}</h2>
                <button onClick={toggleKeyboard} className=''>Keyboard Toggle</button>
            </div>
            <div id='middle'>
                <div id='middle-top' className={showKeyboard ? 'middle-small' : 'middle-large'}>
                    <AuditLog auditLog={data.auditLog} />
                    <Form
                        action={action}
                        setAction={setAction}
                        lastInputFocused={lastInputFocused}
                        setLastInputFocused={setLastInputFocused}
                        formElements={data.flow.formElements}
                        formSuccess={data.flow.formSuccess}
                        message={data.flow.message} />
                </div>
                <div id='middle-bottom'>
                    {showKeyboard ? <Keyboard lastInputFocused={lastInputFocused} /> : null}
                </div>
            </div>
            <div id='bottom'>
                <FunctionButtons buttons={data.flow.functionButtons} setAction={setAction} />
                <StatusBar store={data.store} register={data.register} />
            </div>
        </>
    )
}

export default App
