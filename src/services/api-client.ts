import axios, { AxiosRequestConfig } from "axios";
import { z } from "zod";
import { defineFetchResponseSchema } from "../validation/validate";

// FetchResponse Interface
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
    schema: z.Schema<T>;
    fetchResponseSchema: z.Schema<FetchResponse<T>>;
    constructor(endpoint: string, schema: z.Schema<T>) {
        this.endpoint = endpoint;
        this.schema = schema;
        this.fetchResponseSchema = defineFetchResponseSchema(schema);
    }
    getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
        const response = await axiosInstance.get<unknown>(this.endpoint, config);
        console.log('Response', response.data);
        return response.data as FetchResponse<T>;
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




/* class APIClient<T> {
    endpoint: string;
    schema: z.Schema<T>;
    fetchResponseSchema: z.Schema<FetchResponse<T>>;
    constructor(endpoint: string, schema: z.Schema<T>) {
        this.endpoint = endpoint;
        this.schema = schema;
        this.fetchResponseSchema = defineFetchResponseSchema(schema);
    }
    getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
        const response = await axiosInstance.get<FetchResponse<T>>(this.endpoint, config);
        console.log('Response', response.data);
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
} */

export default APIClient;


/* 
    class APIClient<T> {
    endpoint: string;
    schema: z.Schema<T>;
    fetchResponseSchema: z.Schema<FetchResponse<T>>;

    constructor(endpoint: string, schema: z.Schema<T>) {
        this.endpoint = endpoint;
        this.schema = schema;
        this.fetchResponseSchema = defineFetchResponseSchema(schema);
    }

    getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
        try {
            const response = await axiosInstance.get<unknown>(this.endpoint, config);
            console.log('Raw API Response:', response.data);
            const validationResult = this.fetchResponseSchema.safeParse(response.data);

            if (!validationResult.success) {
                console.error("Validation Error:", validationResult.error);
                console.error("Data received from API (for debugging):", response.data);
                throw new Error("Invalid data structure received from API.");
            }

            return validationResult.data;
        } catch (error) {
            console.error("Error in getAll method:", error);
            throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    }

    post = async (): Promise<FetchResponse<T>> => {
        try {
            const response = await axiosInstance.post<unknown>(this.endpoint);
            console.log('Raw POST Response:', response.data);

            const validationResult = this.fetchResponseSchema.safeParse(response.data);

            if (!validationResult.success) {
                console.error("Validation Error in POST:", validationResult.error);
                throw new Error("Invalid data structure received from API.");
            }

            return validationResult.data;
        } catch (error) {
            console.error("Error in POST method:", error);
            throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    }

    get = async (id: number | string): Promise<T> => {
        try {
            const response = await axiosInstance.get<unknown>(`${this.endpoint}/${id}`);
            console.log('Raw GET Response:', response.data);

            const validationResult = this.schema.safeParse(response.data);

            if (!validationResult.success) {
                console.error("Validation Error in GET:", validationResult.error);
                throw new Error("Invalid data structure received from API.");
            }

            return validationResult.data;
        } catch (error) {
            console.error("Error in GET method:", error);
            throw new Error(error instanceof Error ? error.message : "An unexpected error occurred.");
        }
    }
}
 */