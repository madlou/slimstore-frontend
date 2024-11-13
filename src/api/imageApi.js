export const imageApi = () => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    return {
        getUrl: (url) => {
            return backendURL + url;
        }
    }

}