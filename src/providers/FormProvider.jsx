/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useRef, useContext } from "react";
import { useApi } from "../hooks/useApi";
import { useImmer } from 'use-immer';
import apiDefault from '../data/apiDefault.js';
import { LocationContext } from '../providers/LocationProvider.jsx';
import { TranslationContext } from './TranslationProvider.jsx';

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext();

// eslint-disable-next-line react/prop-types
export const FormProvider = ({ children }) => {
    const { location, setLocation } = useContext(LocationContext);
    const { language } = useContext(TranslationContext);
    const [ user, setUser ] = useState(null);
    const errorCount = useRef(0);
    const logoutTimer = useRef(null);
    const logout = useRef(null);
    const api = useApi({
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
    const [ formElements, updateFormElements] = useImmer([]);
    const [ requestForm, setRequestForm ] = useState(apiDefault.view.form);
    const [ response, setResponse ] = useState(apiDefault);
    const filterForm = (form) => {
        if (form.elements) {
            form.elements = form.elements.filter((element) => {
                switch (element.type) {
                    case 'ERROR':
                    case 'SUBMIT':
                        return false;
                    case 'PRODUCT':
                    case 'PRODUCT_WEB':
                    case 'PRODUCT_DRINK':
                    case 'RETURN':
                        if (element.quantity == 0 || element.quantity == '') {
                            return false;
                        }
                        return true
                    default:
                        return true;
                }
            })
            form.elements = form.elements.map((element) => {
                let newElement = {};
                for (const attributeKey in element) {
                    if (element[attributeKey] != null) {
                        newElement[attributeKey] = element[attributeKey];
                    }
                }
                return newElement;
            })
        }
        return form;
    }
    useEffect(() => {
        if(response.user?.store != null){
            setUser(response.user);
            console.log(location)
            console.log(response.user.store)
            setLocation({...location, ...{store: response.user.store.number}});
        }
        updateFormElements(response.view.form.elements ?? []);
        errorCount.current = 0;
        clearTimeout(logoutTimer.current);
        if(response.view.name != 'LOGIN'){
            logoutTimer.current = setTimeout(logout.current, import.meta.env.VITE_AUTO_LOGOUT * 60 * 1000);
        }
    }, [ response ]);
    useEffect(() => {
        api.post(setResponse, filterForm(requestForm), language);
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
                formElements, updateFormElements,
                requestForm, setRequestForm,
                response, setResponse,
                user,
            }}
        >
            { children }
        </FormContext.Provider>
    );
};
