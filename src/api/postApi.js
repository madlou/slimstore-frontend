export const postApi = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    return {
        getData: async (action, formElements, setRequestForm) => {
            const postObject = {
                storeNumber: 423,
                registerNumber: 2,
                userNumber: 1234,
                action: action ?? null,
                formElements: formElements ?? [],
            };
            console.log('Request', postObject);
            const request = await fetch(backendURL + 'register', {
                method: 'POST',
                body: JSON.stringify(postObject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await request.json();
            console.log('Response', data);
            setRequestForm([]);
            return data;
        }
    }

}