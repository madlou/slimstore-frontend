import Cookies from 'universal-cookie';
import dataSpec from "./dataSpec";

export function createApi({ logger, onError }) {
    const cookies = new Cookies();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const cookieOptions = {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'Strict',
    };
    const filterform = (form) => {
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
    const getCookie = (json) => {
        const cookie = cookies.get('store-register');
        if (cookie) {
            const cookieSplit = cookie.split('-');
            json.store.number = cookieSplit[0];
            json.register.number = cookieSplit[1] ?? '';
        }
        return json;
    }
    const setCookie = (json) => {
        cookies.set(
            'store-register',
            json.store.number + '-' + json.register.number,
            cookieOptions,
        );
    }
    const post = async (form, lang) => {
        return await fetch(backendURL + 'api/register', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept-Language': lang
            },
        });
    };
    return {
        get: async (callback, query) => {
            try {
                const response = await fetch(backendURL + query);
                const json = await response.json();
                logger.info(query, json);
                callback(json);
            } catch {
                logger.error(url, 'ERROR!!', true);
                setTimeout(onError, 1000)
            }
        },
        post: async (callback, form, lang) => {
            if (!form.targetView) {
                return;
            }
            form = filterform(form);
            logger.info('Request', form);
            const response = await post(form, lang);
            if (!response.ok) {
                onError();
                return;
            }
            let json = await response.json();
            json.store ??= dataSpec.store;
            json.register ??= dataSpec.register;
            if (json.store?.number && json.register?.number) {
                setCookie(json);
            } else {
                json = getCookie(json);
            }
            json.view.form ??= dataSpec.view.form;
            json.user ??= dataSpec.user;
            logger.info('Response', json);
            callback(json);
        },
    };
}