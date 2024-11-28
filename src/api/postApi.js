import Cookies from 'universal-cookie';
import { dataSpec } from './dataSpec.js';

export const postApi = () => {
    const cookies = new Cookies();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const logging = import.meta.env.VITE_LOG_TO_CONSOLE == "true" ? true : false;
    return {
        request: async (form) => {
            if (form.elements) {
                form.elements = form.elements.filter((element) => {
                    switch (element.type) {
                        case 'SUBMIT':
                            return false;
                        case 'PRODUCT':
                        case 'PRODUCT_WEB':
                        case 'PRODUCT_DRINK':
                            if (element.quantity == 0 || element.quantity == '') {
                                return false;
                            }
                        default:
                            return true;
                    }
                })
            }
            if (logging === true) {
                console.log('Request', form);
            }
            const request = await fetch(backendURL + 'api/register', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const response = await request.json();
            if (response.store && response.store.number && response.register && response.register.number) {
                const cookieOptions = {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365,
                    sameSite: 'Strict',
                };
                cookies.set(
                    'store-register',
                    response.store.number + "-" + response.register.number,
                    cookieOptions,
                );
            } else {
                response.store = dataSpec().store;
                response.register = dataSpec().register;
            }
            if (response.view.form == null) {
                response.view.form = dataSpec().view.form;
            }
            if (logging) {
                console.log('Response', response);
            }
            return response;
        }
    }

}