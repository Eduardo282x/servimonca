import { postDataApi, putDataApi, deleteDataApi } from "./AxiosActions";
import { BaseResponse } from "../interfaces/actions-api.interface";

export const APIActions = async () => {

    const addApi = async (url: string, newData: any) => {
        await postDataApi(url, newData).then((response: BaseResponse) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    const updateApi = async (url: string, updateData: any) => {
        await putDataApi(url, updateData).then((response: BaseResponse) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    const deleteApi = async (url: string, deleteData: any, keyWord: string) => {
        await deleteDataApi(url, deleteData[keyWord]).then((response: BaseResponse) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }

} 









