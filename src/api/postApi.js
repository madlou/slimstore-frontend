import Cookies from 'universal-cookie';
import { dataSpec } from './dataSpec.js';

export const postApi = () => {
    const cookies = new Cookies();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const logging = import.meta.env.VITE_LOG_TO_CONSOLE == "true" ? true : false;
    return {
        getData: async (action, setAction, formElements, setRequestForm, formProcess) => {
            formElements = formElements.filter((element) => {
                switch (element.type.toLowerCase()) {
                    case 'submit':
                        return false;
                    case 'product':
                    case 'product_web':
                    case 'product_drink':
                        if (element.quantity == 0 || element.quantity == '') {
                            return false;
                        }
                    default:
                        return true;
                }
            })
            const postObject = {
                targetView: action ?? null,
                serverProcess: formProcess ?? '',
                elements: formElements ?? [],
            };
            if (logging === true) {
                console.log('Request', postObject);
            }
            const request = await fetch(backendURL + 'api/register', {
                method: 'POST',
                body: JSON.stringify(postObject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await request.json();
            if (data.store && data.store.number && data.register && data.register.number) {
                const cookieOptions = {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365,
                    sameSite: 'Strict',
                };
                cookies.set(
                    'store-register',
                    data.store.number + "-" + data.register.number,
                    cookieOptions,
                );
            } else {
                data.store = dataSpec().store;
                data.register = dataSpec().register;
            }
            setRequestForm([]);
            setAction('');
            if (logging) {
                console.log('Response', data);
            }
            return data;
        }
    }

}