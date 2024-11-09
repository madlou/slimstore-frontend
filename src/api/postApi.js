export const postApi = () => {
    return {
        getData: async (action, formElements, setForm) => {
            const postObject = {
                storeNumber: 423,
                registerNumber: 2,
                userNumber: 1234,
                action: action ?? null,
                formElements: formElements ?? [],
            };
            console.log('Request', postObject);
            const request = await fetch('http://localhost:8084/slimstore/api/register', {
                method: 'POST',
                body: JSON.stringify(postObject),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            const data = await request.json();
            console.log('Response', data);
            setForm([]);
            return data;
        }
    }

}