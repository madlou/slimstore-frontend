/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useRef } from "react";
import { useApi } from "../hooks/useApi";
import { useLogger } from "../hooks/useLogger";
import { useMoney } from '../hooks/useMoney.js';
import { useImmer } from 'use-immer';
import apiDefault from '../data/apiDefault.js';

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
    const logger = useLogger();
    const errorCount = useRef(0);
    const logoutTimer = useRef(null);
    const logout = useRef(null);
    const api = useApi({
        logger: logger,
        onError: () => {
            if (errorCount.current > 10) {
                window.location.reload();
                return;
            }
            setResponse(apiDefault);
            setTimeout(() => {
                errorCount.current++;
                setRequestForm({ ...requestForm });
            }, 5 * 1000)
        },
    });
    const [ lang, setLang ] = useState('EN');
    const [ formElements, updateFormElements] = useImmer([]);
    const [ requestForm, setRequestForm ] = useState(apiDefault.view.form);
    const [ response, setResponse ] = useState(apiDefault);
    const { updateMoney, formatMoney } = useMoney();
    useEffect(() => {
        updateFormElements(response.view.form.elements ?? []);
        updateMoney({
            currencyCode: response.store.currencyCode ?? '',
            countryCode: response.store.countryCode ?? '',
        })
        errorCount.current = 0;
        clearTimeout(logoutTimer.current);
        if(response.view.name != 'LOGIN'){
            logoutTimer.current = setTimeout(logout.current, import.meta.env.VITE_AUTO_LOGOUT * 60 * 1000);
        }
    }, [ response ]);
    useEffect(() => {
        api.post(setResponse, requestForm, lang);
    }, [ requestForm ]);
    useEffect(()=>{
        logout.current = ()=>{
            setRequestForm({
                ...response.view.form,
                serverProcess: 'LOGOUT'
            });
        }
        window.removeEventListener('beforeunload', logout.current);
        window.addEventListener('beforeunload', logout.current);
    }, []);
    return (
        <FormContext.Provider
            value={{
                lang, setLang,
                formElements, updateFormElements,
                requestForm, setRequestForm,
                response, setResponse,
                formatMoney,
            }}
        >
            { children }
        </FormContext.Provider>
    );
};
