import apiDefault from "../data/apiDefault";
import { useLogger } from "./useLogger";

export function useApi({ onError }) {
    const logger = useLogger();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    return {
        get: async (callback, query) => {
            if(query.substring(0, 1) === '/') {
                query = query.substring(1);
            }
            try {
                const response = await fetch(backendURL + query);
                const json = await response.json();
                if(json.error){
                    logger.error(query, json, true);
                    setTimeout(onError, 1000);
                    return;
                }
                logger.info(query, json);
                callback(json);
            } catch {
                logger.error(query, 'ERROR!!', true);
                setTimeout(onError, 1000);
            }
        },
        post: async (callback, form, lang) => {
            if (!form.targetView) {
                return;
            }
            logger.info('Request', form);
            const response = await fetch(backendURL + 'api/register', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept-Language': lang
                },
            });
            if (!response.ok) {
                onError();
                return;
            }
            let json = await response.json();
            json.view.name ??= 'HOME'
            json.view.form ??= apiDefault.view.form;
            json.user ??= apiDefault.user;
            logger.info('Response', json);
            callback(json);
        },
    };
}