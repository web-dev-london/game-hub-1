import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
    next?: string | null;
}


const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: `fe8458d448534be5a17ad3fff0edfd69`,
    },
});

class APIClient<T> {
    endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    get = async (config?: AxiosRequestConfig) => {
        const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, config);
        return response.data;
    }

    post = async () => {
        const response = await axiosInstance.post<FetchResponse<T>>(this.endpoint);
        return response.data;
    }
}

export default APIClient;