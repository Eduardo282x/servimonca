import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IStore {
    id: string;
    model: string;
    brand: string;
    yearManufactured: number;
    serialNumber: string;
    loadCapacity: number;
    dimensions: string;
    currentStatus: string;
    createdAt: string;
}

// Table
export const columnsStore: IColumns[] = [
    {
        label: 'Modelo',
        column: 'model',
        element: (data: IStore) => data.model,
    },
    {
        label: 'Marca',
        column: 'brand',
        element: (data: IStore) => data.brand,
    },
    {
        label: 'Año Fabricacion',
        column: 'yearManufactured',
        element: (data: IStore) => data.yearManufactured.toString(),
    },
    {
        label: 'Numero de serie',
        column: 'serialNumber',
        element: (data: IStore) => data.serialNumber,
    },
    {
        label: 'Capacidad de Carga',
        column: 'loadCapacity',
        element: (data: IStore) => data.loadCapacity.toString(),
    },
    {
        label: 'Dimensiones',
        column: 'dimensions',
        element: (data: IStore) => data.dimensions,
    },
    // {
    //     label: 'Estado',
    //     column: 'currentStatusId',
    //     element: (data: IStore) => data.currentStatus,
    // },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
        icon: true,
        canFilter: false
    },
];

// Dialog & Form
export interface IStoreForm {
    model: string;
    brand: string;
    yearManufactured: number;
    serialNumber: string;
    loadCapacity: number;
    dimensions: string;
    currentStatus: string;
}

export const storeDataForm: IDataForm[] = [
    {
        label: 'Modelo',
        value: '',
        type: 'text',
        name: 'model',
    },
    {
        label: 'Marca',
        value: '',
        type: 'text',
        name: 'brand',
    },
    {
        label: 'Año Fabricación',
        value: '',
        type: 'number',
        name: 'yearManufactured',
    },
    {
        label: 'Numero de Serie',
        value: '',
        type: 'text',
        name: 'serialNumber',
    },
    {
        label: 'Capacidad de Carga',
        value: '',
        type: 'number',
        name: 'loadCapacity',
    },
    {
        label: 'Dimensiones',
        value: '',
        type: 'text',
        name: 'dimensions',
    },
    {
        label: 'Estado',
        value: '',
        type: 'select',
        name: 'currentStatus',
        options: [
            {
                label: 'Disponible',
                value: 0
            },
            {
                label: 'En uso',
                value: 1
            },
            {
                label: 'En reparación',
                value: 2
            }
        ]
    }
];

export const storeDefaultValues: IStoreForm = {
    model: '',
    brand: '',
    yearManufactured: 0,
    serialNumber: '',
    loadCapacity: 0,
    dimensions: '',
    currentStatus: ''
}

export const storeValidationSchema: object = z.object({
    model: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    brand: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    yearManufactured: z.number({ message: 'El campo es requerido' }),
    serialNumber: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    loadCapacity: z.number({ message: 'El campo es requerido' }),
    dimensions: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    currentStatus: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});

