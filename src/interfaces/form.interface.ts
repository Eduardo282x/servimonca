/* eslint-disable @typescript-eslint/no-explicit-any */
import { actionsValid, TableReturn } from "./table.interface";

export interface IForm {
    title: string;
    description: string;
    descriptionColored?: string;
    buttonText: string;
    dataForm: IDataForm[];
    defaultValues: any;
    validationSchema: object;
    action: actionsValid;
    onSubmitForm: (formData: TableReturn) => void;
}

export interface FormValues {
    [key: string]: any;
}  

export interface IDataForm {
    label: string;
    value: string;
    type: TypesInputs;
    name: string;
    options?: IOptions[];
}

export type TypesInputs = 'text' | 'number' | 'select' | 'textArea' | 'email' | 'date' | 'year';

export interface IOptions {
    label: string;
    value: string | number;
}

