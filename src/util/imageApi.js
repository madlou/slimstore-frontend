const imageApi = (url) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;
    if (url.substring(0, 5) == 'image') {
        return backendURL + url;
    }
    return url;
}

export default imageApi;