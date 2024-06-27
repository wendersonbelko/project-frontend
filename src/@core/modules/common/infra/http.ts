import axios from 'axios';
import {CustomException, ErrorMap} from '@core/modules/common/infra/error';
import queryString from 'query-string';

// const NODE_ENV = import.meta.env.MODE;
const API_URL = import.meta.env.VITE_API_BASE_URL;

const data = (baseURL: string, isUpload = false) => ({
    baseURL: baseURL,
    headers: {
        'Content-Type': isUpload ? 'multipart/form-data' : 'application/json',
    },
    timeout: 60000,
    paramsSerializer: {
        serialize: (params: any) => {
            return queryString.stringify(params, {arrayFormat: 'bracket'});
        },
    },
});


export const httpApi = axios.create(data(API_URL));
export const httpApiUpload = axios.create(data(API_URL, true));

export const setHeaderAuthorization = async (token: string) => {
    if (!httpApi || !token) return;

    if (httpApi?.defaults) {
        sessionStorage.setItem('token', token);
        httpApi.defaults.headers.authorization = `${token}`;
        httpApi.defaults.headers.Authorization = `${token}`;

        httpApi.interceptors.request.use(
            function (config) {
                config.headers.authorization = `Bearer ${token}`;
                config.headers.Authorization = `Bearer ${token}`;
                config.paramsSerializer = (params) =>
                    queryString.stringify(params, {arrayFormat: 'bracket'});
                return config;
            },
            function () {
                return Promise.reject(new CustomException(ErrorMap.NOT_AUTHORIZED));
            },
        );
    }
};

if (httpApi) {
    const interceptorResponse = async (error: any) => {
        if (error?.response === undefined) throw new CustomException(ErrorMap.SERVER_CONNECTION);
        if (error?.response?.status === 401) {
            throw new CustomException(ErrorMap.NOT_AUTHORIZED);
        }

        throw error;
    };

    httpApi?.interceptors?.response?.use(
        async (response) => response,
        async (error) => interceptorResponse(error),
    );
}

export const getToken = async () => {
    const token = sessionStorage.getItem('token');
    if (!httpApi || !token) return;
    httpApi.defaults.headers.authorization = `Bearer ${token}`;
    httpApi.defaults.headers.Authorization = `Bearer ${token}`;
};

getToken();

export const formatQueryParams = (path: string, params: any) => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            queryParams.append(key, value?.toString());
        }
    }
    return `${path}?${queryParams.toString()}`;
};
