export const postApi = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    return {
        getData: async (action, formElements, setRequestForm, formProcess) => {
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
                storeNumber: 423,
                registerNumber: 2,
                userNumber: 1234,
                action: action ?? null,
                formProcess: formProcess ?? '',
                formElements: formElements ?? [],
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
            console.log('Response', data);
            setRequestForm([]);
            return data;
        }
    }

}