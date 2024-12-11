import api from "../env/axios";
import { BaseResponse } from "../interfaces/actions-api.interface";

export const getDataApi = (endpoint: string) => {
    return api.get(endpoint).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const postDataApi = async (endpoint: string, data: any): Promise<BaseResponse | any> => {
    return await api.post(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response;
    })
}

export const putDataApi = async (endpoint: string, data: any): Promise<BaseResponse> => {
    return await api.put(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const deleteDataApi = async (endpoint: string, data: number): Promise<BaseResponse> => {
    return await api.delete(`${endpoint}/${data}`).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}





