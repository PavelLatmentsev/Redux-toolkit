import httpsService from "./http.service"
const todosEndpoint = "todos/"
const todosService = {

    fetch: async () => {
        const { data } = await httpsService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        })
        return data;
    },
    postData: async (payload) => {
        const { data } = await httpsService.post(todosEndpoint, payload
        )
        return data;
    }
};

export default todosService;