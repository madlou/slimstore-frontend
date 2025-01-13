import { createContext, useState, useEffect, useRef } from "react";
import { createApi } from "../util/createApi";
import { createLogger } from "../util/createLogger";
import { useImmer } from "use-immer";
import dataSpec from '../util/dataSpec.js'

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const logger = createLogger();
    const errorCount = useRef(0);
    const logoutTimer = useRef(null);
    const api = createApi({
        logger: logger,
        onError: () => {
            if (errorCount.current > 10) {
                window.location.reload();
                return;
            }
            setResponse(dataSpec);
            setTimeout(() => {
                errorCount.current++;
                setRequestForm({ ...requestForm });
            }, 5000)
        },
    });
    const [lang, setLang] = useState('EN');
    const [formElements, updateFormElements] = useImmer([]);
    const [requestForm, setRequestForm] = useState(dataSpec.view.form);
    const [response, setResponse] = useState(dataSpec);
    useEffect(() => {
        updateFormElements(response.view.form.elements ?? []);
        errorCount.current = 0;
        clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
            setRequestForm({
                ...response.view.form,
                serverProcess: 'LOGOUT'
            });
        }, import.meta.env.VITE_AUTO_LOGOUT * 60 * 1000);
    }, [response]);
    useEffect(() => {
        api.post(setResponse, requestForm, lang);
    }, [requestForm]);
    return (
        <FormContext.Provider
            value={{
                lang, setLang,
                formElements, updateFormElements,
                requestForm, setRequestForm,
                response, setResponse,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
