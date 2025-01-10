import { BaseResponse } from "../interfaces/actions-api.interface";
import { actionsValid } from "../interfaces/table.interface"
import { postDataApi, putDataApi, deleteDataApi } from "./AxiosActions";

export interface BaseApiReturn {
    close: boolean,
    open: boolean,
    body: object,
    action: actionsValid,
    snackbarMessage: BaseResponse | void;
    // data: any
}

export const BaseApi = async (action: actionsValid, data: any, body: any, id: string, urlComponent: string): Promise<BaseApiReturn> => {

    const response: BaseApiReturn = {
        close: false,
        open: false,
        body: {},
        action: '',
        snackbarMessage: {success: false, message: ''},
    };
    
    response.body = action === 'edit' ? data : body;
    response.action = action === 'edit' ? 'edit' : 'add';
    
    if(action === 'add' || action === 'edit') {
        response.open = true
    }

    if(action === 'add') {
        response.body = {};
    }

    if (action === 'delete') {
        await deleteApi(urlComponent, data, id)
    }

    if (action == 'addApi') {
        const message = await addApi(urlComponent, data);
        response.snackbarMessage = message;
        response.close = true;
    }

    if (action == 'editApi') {
        const message = await updateApi(urlComponent, data);
        response.snackbarMessage = message;
        response.close = true;
    }

    return response;
}

const addApi = async (url: string, newData: any) => {
    const addMessage = await postDataApi(url, newData).then((response: BaseResponse) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });

    return addMessage;
}
const updateApi = async (url: string, updateData: any) => {
    const updateMessage = await putDataApi(url, updateData).then((response: BaseResponse) => {
        return response;
    }).catch((err) => {
        console.log(err);
    });

    return updateMessage;
}
const deleteApi = async (url: string, deleteData: any, id: string) => {
    await deleteDataApi(url, deleteData[id]).then((response: BaseResponse) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}