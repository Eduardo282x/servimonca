import { actionsValid } from "./table.interface";

export interface IForm {
    title: string;
    description: string;
    descriptionColored?: string;
    buttonText: string;
    dataForm: IDataForm[];
    defaultValues: object;
    validationSchema: object;
    action: actionsValid;
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

export type TypesInputs = 'text' | 'number' | 'select' | 'textArea' | 'email';

export interface IOptions {
    label: string;
    value: string | number;
}

