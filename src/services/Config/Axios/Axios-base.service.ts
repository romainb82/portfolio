import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpClientResponse<T> = [null, T] | [Error | any];

export interface HttpClient {
    get<T = unknown>(path: string): Promise<HttpClientResponse<T>>;
    post<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>>;
    put<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>>;
    patch<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>>;
    delete<T = unknown>(path: string): Promise<HttpClientResponse<T>>;
}

export default abstract class AxiosHttpService implements HttpClient {
    private _axiosInstance: AxiosInstance;
    private _baseUri: string;

    constructor(axios: AxiosInstance, baseUri: string) {
        this._axiosInstance = axios;
        this._baseUri = baseUri;
    }

    protected async request<T>(path: string, config: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
        config.url = this._baseUri + path;
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.request<T>(config);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }

    async get<T = unknown>(path: string): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.get<T>(this._baseUri + path);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }

    async post<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.post<T>(this._baseUri + path, body);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }

    async put<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.put<T>(this._baseUri + path, body);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }

    async patch<T = unknown, D = any>(path: string, body: D): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.patch<T>(this._baseUri + path, body);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }

    async delete<T = unknown>(path: string): Promise<HttpClientResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this._axiosInstance.delete<T>(this._baseUri + path);
            return [null, response.data];
        } catch (error) {
            const axiosError = error as AxiosError;
            return [axiosError];
        }
    }
}
