export const postApi = () => {
    return {
        getData: async (action, formElements) => {
            const request = await fetch('http://localhost:8084/slimstore/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    storeNumber: 423,
                    registerNumber: 2,
                    userNumber: 1234,
                    action: action ?? null,
                    formElements: formElements ?? [],
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            return await request.json();
        }
    }

}