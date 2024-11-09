export const tjxProductApi = () => {
    return {
        onlineSearch: async (query) => {
            const url = 'http://localhost:8084/slimstore/api/products/' + query;
            const request = await fetch(url);
            const data = await request.json()
            return data;
        }
    }

}