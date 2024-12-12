import { useState, useEffect } from 'react'
import { useImmer } from "use-immer";
import postApi from './api/postApi.js'
import dataSpec from './api/dataSpec.js'
import Basket from './components/Basket.jsx'
import Keyboard from './components/Keyboard.jsx'
import Form from './components/Form.jsx'
import FunctionButtons from './components/FunctionButtons.jsx'
import PrintHeader from './components/PrintHeader.jsx'
import PrintFooter from './components/PrintFooter.jsx'
import Report from './components/Report.jsx'
import StatusBar from './components/StatusBar.jsx'
import './App.css'

function App() {
    const [inputFocused, setInputFocused] = useState(null)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [viewName, setViewName] = useState('')
    const [response, setResponse] = useState(dataSpec)
    const [requestForm, setRequestForm] = useState(dataSpec.view.form);
    const [formElements, updateFormElements] = useImmer([])
    const [lang, setLang] = useState('en');
    const toggleKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    }
    const request = async () => {
        if (requestForm.targetView != null) {
            const response = await postApi(requestForm, lang);
            if (response) {
                setResponse(response);
            } else {
                setResponse(dataSpec);
                setTimeout(() => {
                    request();
                }, 1000)
            }
        }
    }
    const langChange = (evt) => {
        setLang(evt.target.value);
        setRequestForm({ ...dataSpec.view.form });
    }
    useEffect(() => {
        updateFormElements(response.view.form.elements ?? []);
        setViewName(response.view.name)
    }, [response]);
    useEffect(() => {
        request();
    }, [requestForm]);
    return (
        <>
            <div id='top' className='no-print'>
                <h1>{response.uiTranslations.logo}</h1>
                <h2>{response.uiTranslations.header} - {response.view.title}</h2>
                <button onClick={toggleKeyboard}>{response.uiTranslations.keyboard}</button>
                {['HOME', 'LOGIN'].includes(viewName) ?
                    <select id='lang' value={lang} onChange={langChange}>
                        {response.languages.map((language) => {
                            return <option key={language} value={language.toLowerCase()}>{language}</option>;
                        })}
                    </select>
                    : ""
                }
            </div>
            <div id='middle'>
                <div id='middle-top' className={showKeyboard ? 'middle-small' : 'middle-large'}>
                    <PrintHeader
                        response={response}
                    />
                    {response.report && response.report.length > 0 ?
                        <Report
                            report={response.report}
                            uiTranslations={response.uiTranslations}
                        />
                        :
                        <Basket
                            basket={response.basket}
                            name={response.view.name}
                            tender={response.tender}
                            uiTranslations={response.uiTranslations}
                        />
                    }
                    <PrintFooter
                        response={response}
                    />
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
                    formElements={formElements}
                    response={response}
                    setRequestForm={setRequestForm}
                />
                <StatusBar
                    store={response.store}
                    register={response.register}
                    uiTranslations={response.uiTranslations}
                    user={response.user}
                />
            </div>
        </>
    )
}

export default App;
