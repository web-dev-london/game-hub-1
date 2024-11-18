import axios, { AxiosRequestConfig } from "axios";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { defineFetchResponseSchema } from "../validation/validate";
import { FetchResponse } from "../validation/validate";


const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: import.meta.env.VITE_GAME_API_KEY
  },
});

const validateResponse = <T>(schema: z.ZodSchema<FetchResponse<T>>, data: unknown): FetchResponse<T> => {
  const validation = schema.safeParse(data);

  if (!validation.success) {
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
    const fetchResponseSchema = defineFetchResponseSchema(this.schema);
    return validateResponse(fetchResponseSchema, response.data);
  }

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