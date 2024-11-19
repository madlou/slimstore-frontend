import { useState, useEffect, useMemo } from 'react'
import Keyboard from './components/Keyboard.jsx'
import Basket from './components/Basket.jsx'
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
    const [action, setAction] = useState('')
    const [process, setProcess] = useState('');
    const [requestForm, setRequestForm] = useState([])
    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    }
    const getData = async (action) => {
        setLastInputFocused(document.getElementById('input-1'));
        setData(await postApi().getData(action, setAction, requestForm, setRequestForm, process));
    }
    const submit = (evt, action = data.view.formSuccess) => {
        evt.preventDefault();
        for (let i = 0; i < evt.target.length; i++) {
            data.view.formElements[i].value = evt.target[i].value;
        }
        setRequestForm(data.view.formElements)
        setAction(action);
    }
    useEffect(() => {
        if (action) {
            getData(action);
        }
    }, [action]);
    useEffect(() => {
        setProcess(data.view.formProcess)
    }, [data]);
    useEffect(() => {
        getData('');
    }, []);
    return (
        <>
            <div id='top'>
                <h1>TJX</h1>
                <h2>SlimStore POS - {data.view.title}</h2>
                <button onClick={toggleKeyboard}>Keyboard Toggle</button>
            </div>
            <div id='middle'>
                <div id='middle-top' className={showKeyboard ? 'middle-small' : 'middle-large'}>
                    <Basket basket={data.basket} tender={data.tender} />
                    <Form
                        action={action}
                        setAction={setAction}
                        lastInputFocused={lastInputFocused}
                        setLastInputFocused={setLastInputFocused}
                        formElements={data.view.formElements}
                        formSuccess={data.view.formSuccess}
                        setRequestForm={setRequestForm}
                        submit={submit}
                        message={data.view.message}
                        error={data.error}
                        showKeyboard={showKeyboard} />
                </div>
                {showKeyboard ? (
                    <div id='middle-bottom'>
                        <Keyboard lastInputFocused={lastInputFocused} />
                    </div>
                ) : null}
            </div>
            <div id='bottom'>
                <FunctionButtons buttons={data.view.functionButtons} setAction={setAction} submit={submit} setProcess={setProcess} data={data} />
                <StatusBar store={data.store} register={data.register} user={data.user} />
            </div>
        </>
    )
}

export default App
