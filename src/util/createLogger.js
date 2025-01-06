export function createLogger() {
    let logDebug = false;
    let logInfo = false;
    let logError = false;
    switch (import.meta.env.VITE_LOG_TO_CONSOLE) {
        case 'debug':
            logDebug = true;
        case 'info':
            logInfo = true;
        case 'error':
            logError = true;
    }
    return {
        debug: (key, value) => {
            if (logDebug) {
                console.debug(key, value)
            }
        },
        info: (key, value) => {
            if (logInfo) {
                console.log(key, value)
            }
        },
        error: (key, value) => {
            if (logError) {
                console.error(key, value)
            }
        },
    };
}