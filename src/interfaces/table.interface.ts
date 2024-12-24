
export interface IColumns {
    label: string;
    column: string;
    element: (data: any) => string;
    canFilter?: boolean;
}

export interface ConfigTable {
    searchInput: boolean;
    addBtn: boolean;
}

export interface TableReturn {
    action: actionsValid;
    data: any;
}

export type actionsValid = 'edit' | 'add' | 'delete' | '';
