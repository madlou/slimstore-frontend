import Cookies from 'universal-cookie';
import { dataSpec } from './dataSpec.js';

export const postApi = () => {
    const cookies = new Cookies();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const logging = import.meta.env.VITE_LOG_TO_CONSOLE == "true" ? true : false;
    return {
        request: async (form, lang) => {
            if (form.elements) {
                form.elements = form.elements.filter((element) => {
                    switch (element.type) {
                        case 'SUBMIT':
                            return false;
                        case 'PRODUCT':
                        case 'PRODUCT_WEB':
                        case 'PRODUCT_DRINK':
                        case 'RETURN':
                            if (element.quantity == 0 || element.quantity == '') {
                                return false;
                            }
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
            if (logging === true) {
                console.log('Request', form);
            }
            const request = await fetch(backendURL + 'api/register', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept-Language': lang
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
            } else if (cookies.get('store-register')) {
                response.store = dataSpec().store;
                response.register = dataSpec().register;
                const cookieSplit = cookies.get('store-register').split('-');
                response.store.number = cookieSplit[0];
                response.register.number = cookieSplit[1] ?? '';
            } else {
                response.store = dataSpec().store;
                response.register = dataSpec().register;
            }
            if (response.view.form == null) {
                response.view.form = dataSpec().view.form;
            }
            if (response.user == null) {
                response.user = dataSpec().user;
            }
            if (logging) {
                console.log('Response', response);
            }
            return response;
        }
    }

}