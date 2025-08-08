
import type { Token } from '@/services/Config/Config.interfaces'
import axios, { type AxiosInstance, type AxiosRequestConfig, AxiosHeaders, AxiosError, type InternalAxiosRequestConfig } from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

abstract class BaseApiService {
    protected readonly axiosInstance: AxiosInstance;

    protected constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        this.initializeRequestInterceptor();
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const headers = this.getDynamicHeaders();
                if (headers) {
                    const axiosHeaders = new AxiosHeaders(config.headers);
                    Object.entries(headers).forEach(([key, value]) => {
                        axiosHeaders.set(key, value);
                    });
                    config.headers = axiosHeaders;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );
    }

    protected abstract getDynamicHeaders(): Record<string, string | undefined>;

    protected abstract refreshaccess_token(): Promise<string | null>;

    public get axios(): AxiosInstance {
        return this.axiosInstance;
    }
}

class ConfigService extends BaseApiService {
    private readonly STORAGE_KEY = 'tokenAmfie';

    constructor() {
        super(apiUrl);
    }

    private getToken(): Token | null {
        const storage =
            sessionStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.STORAGE_KEY);
        return storage ? JSON.parse(storage) : null;
    }

    protected getDynamicHeaders(): Record<string, string | undefined> {
        const token = this.getToken();
        if (token?.access_token) {
            return { Authorization: `Bearer ${token.access_token}` };
        }
        return {};
    }

    protected async refreshaccess_token(): Promise<string | null> {
        const token = this.getToken();
        if (token?.refresh_token) {
            try {
                const response = await this.axiosInstance.post('/auth/refresh-token', {}, {
                    headers: { Authorization: `Bearer ${token.refresh_token}` },
                });

                if (response.status === 200) {
                    const { access_token, refresh_token } = response.data;
                    const updatedToken = { ...token, access_token, refresh_token };

                    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedToken));
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedToken));

                    return access_token;
                }
            } catch (error) {
                console.error('Échec du rafraîchissement du token:', error);
            }
        }
        return null;
    }

    public get axios(): AxiosInstance {
        return this.axiosInstance;
    }
}

export const configService = new ConfigService();

