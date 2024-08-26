import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
    next?: string | null;
    previous?: string | null;
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
    getAll = async (config?: AxiosRequestConfig) => {
        const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, config);
        return response.data;
    }

    post = async () => {
        const response = await axiosInstance.post<FetchResponse<T>>(this.endpoint);
        return response.data;
    }

    get = async (id: number | string) => {
        const response = await axiosInstance.get<T>(this.endpoint + "/" + id);
        return response.data;
    }
}

export default APIClient;