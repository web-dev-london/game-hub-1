import axios, { AxiosRequestConfig } from "axios";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { defineFetchResponseSchema } from "../validation/validate";
import { FetchResponse } from "../validation/validate";


const axiosInstance = axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: `fe8458d448534be5a17ad3fff0edfd69`,
    },
});

const validateResponse = <T>(schema: z.ZodSchema<FetchResponse<T>>, data: unknown): FetchResponse<T> => {
    const validation = schema.safeParse(data);
    console.log('Validation:', validation);
    if (!validation.success) {
        console.log(fromZodError(validation.error));
        throw new Error("Invalid data structure received from the API." + fromZodError(validation.error));
    }
    return validation.data;
};

class APIClient<T> {
    endpoint: string;
    schema: z.ZodSchema<T>;
    constructor(endpoint: string, schema: z.ZodSchema<T>) {
        this.endpoint = endpoint;
        this.schema = schema;
    }

    getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {

        const response = await axiosInstance.get<unknown>(this.endpoint, config);
        console.log('Raw API Response:', response.data);
        const fetchResponseSchema = defineFetchResponseSchema(this.schema);
        console.log('Fetch Response Schema:', fetchResponseSchema);

        return validateResponse(fetchResponseSchema, response.data);

    }


    /*     post = async (): Promise<FetchResponse<T>> => {
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
        } */


    get = async (id: string): Promise<T> => {
        const response = await axiosInstance.get<unknown>(`${this.endpoint}/${id}`);

        const validation = this.schema.safeParse(response.data);
        if (!validation.success) {
            console.error("Validation error in GET:", validation.error);
            throw new Error("Invalid data structure received from the API.");
        }
        return validation.data;
    }
}

export default APIClient;