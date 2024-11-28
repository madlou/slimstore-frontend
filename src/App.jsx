import { useState, useEffect, useMemo } from 'react'
import Keyboard from './components/Keyboard.jsx'
import Basket from './components/Basket.jsx'
import Report from './components/Report.jsx'
import Form from './components/Form.jsx'
import FunctionButtons from './components/FunctionButtons.jsx'
import StatusBar from './components/StatusBar.jsx'
import { postApi } from './api/postApi.js'
import { dataSpec } from './api/dataSpec.js'
import './App.css'
import PrintHeader from './components/PrintHeader.jsx'
import PrintFooter from './components/PrintFooter.jsx'
import { useImmer } from "use-immer";

function App() {
    const [inputFocused, setInputFocused] = useState(null)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [viewName, setViewName] = useState('')
    const [response, setResponse] = useState(dataSpec())
    const [requestForm, setRequestForm] = useState(dataSpec().view.form);
    const [formElements, updateFormElements] = useImmer([])
    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    }
    const request = async () => {
        if (requestForm.targetView != null) {
            setResponse(await postApi().request(requestForm));
        }
    }
    useEffect(() => {
        if (viewName != response.view.name) {
            updateFormElements(response.view.form.elements ?? []);
            setViewName(response.view.name)
        }
    }, [response]);
    useEffect(() => {
        request();
    }, [requestForm]);
    return (
        <>
            <div id='top' className='no-print'>
                <h1>XJT</h1>
                <h2>SlimStore POS - {response.view.title}</h2>
                <button onClick={toggleKeyboard}>Keyboard Toggle</button>
            </div>
            <div id='middle'>
                <div id='middle-top' className={showKeyboard ? 'middle-small' : 'middle-large'}>
                    <PrintHeader />
                    {response.report && response.report.length > 0 ?
                        <Report report={response.report} />
                        :
                        <Basket basket={response.basket} tender={response.tender} name={response.view.name} />
                    }
                    <PrintFooter />
                    <Form
                        response={response}
                        formElements={formElements}
                        inputFocused={inputFocused}
                        setInputFocused={setInputFocused}
                        setRequestForm={setRequestForm}
                        showKeyboard={showKeyboard}
                        updateFormElements={updateFormElements}
                    />
                </div>
                {showKeyboard ? (
                    <div id='middle-bottom' className='no-print'>
                        <Keyboard
                            inputFocused={inputFocused}
                            setInputFocused={setInputFocused}
                            updateFormElements={updateFormElements}
                            viewName={viewName}
                        />
                    </div>
                ) : null}
            </div>
            <div id='bottom' className='no-print'>
                <FunctionButtons
                    buttons={response.view.functionButtons}
                    formElements={formElements}
                    response={response}
                    setRequestForm={setRequestForm}
                />
                <StatusBar
                    store={response.store}
                    register={response.register}
                    user={response.user}
                />
            </div>
        </>
    )
}

export default App;
