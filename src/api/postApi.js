import Cookies from 'universal-cookie';
import { dataSpec } from './dataSpec.js';

export const postApi = () => {

    const cookies = new Cookies();

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    return {
        getData: async (action, setAction, formElements, setRequestForm, formProcess) => {
            formElements = formElements.filter((element) => {
                switch (element.type) {
                    case 'submit':
                        return false;
                    case 'product':
                        if (element.value == 0 || element.value == '') {
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
            console.log('Request', postObject);
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
            console.log('Response', data);
            return data;
        }
    }

}