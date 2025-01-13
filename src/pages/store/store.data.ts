import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import dayjs, { Dayjs } from "dayjs";

export interface IStore {
    id: string;
    model: string;
    brand: string;
    yearManufactured: Dayjs;
    serialNumber: string;
    loadCapacity: number;
    dimensions: string;
    currentStatusId: number;
    status: Status;
    statusDescription: string;
    createdAt: string;
}

export interface Status {
    id: number;
    status: string;
}

// Table
export const storeColumns: IColumns[] = [
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
    {
        label: 'Estado',
        column: 'statusDescription',
        element: (data: IStore) => data.statusDescription,
    },
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
    id: '';
    model: string;
    brand: string;
    yearManufactured: Dayjs;
    serialNumber: string;
    loadCapacity: number;
    dimensions: string;
    currentStatusId: number;
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
        type: 'date',
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
        name: 'currentStatusId',
        options: [
            {
                label: 'Disponible',
                value: 1
            },
            {
                label: 'En alquiler',
                value: 2
            },
            {
                label: 'En mantenimiento',
                value: 3
            },
            {
                label: 'Reparacion',
                value: 4
            },
            {
                label: 'No disponible',
                value: 5
            },
        ]
    }
];

export const storeDefaultValues: IStoreForm = {
    id: '',
    model: '',
    brand: '',
    yearManufactured: dayjs(),
    serialNumber: '',
    loadCapacity: 0,
    dimensions: '',
    currentStatusId: 0
}

export const storeValidationSchema: object = z.object({
    model: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    brand: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    serialNumber: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    loadCapacity: z.number({ message: 'El campo es requerido' }),
    dimensions: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    currentStatusId: z.coerce.number({ message: 'El campo es requerido' }),
});


