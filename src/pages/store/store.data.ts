import { z } from "zod";
import { IDataForm } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export interface IStore {
    carType: string;
    branch: string;
    year: number;
    series: string;
    capacity: number;
    dimensions: string;
    status: string;
}

export const storeDataForm: IDataForm[] = [
    {
        label: 'Modelo',
        value: '',
        type: 'text',
        name: 'carType',
    },
    {
        label: 'Marca',
        value: '',
        type: 'text',
        name: 'branch',
    },
    {
        label: 'Año Fabricación',
        value: '',
        type: 'number',
        name: 'year',
    },
    {
        label: 'Numero de Serie',
        value: '',
        type: 'text',
        name: 'series',
    },
    {
        label: 'Capacidad de Carga',
        value: '',
        type: 'number',
        name: 'capacity',
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
        name: 'status',
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

export const storeDefaultValues: IStore = {
    carType: '',
    branch: '',
    year: 0,
    series: '',
    capacity: 0,
    dimensions: '',
    status: ''
}

export const storeValidationSchema: object = z.object({
    carType: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    branch: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    year: z.number().refine(number => number !== 0, { message: 'El campo es requerido' }),
    series: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    capacity: z.number().refine(number => number !== 0, { message: 'El campo es requerido' }),
    dimensions: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    status: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
});

export const columnsStore: IColumns[] = [
    {
        label: 'Modelo',
        column: 'carType',
        element: (data: IStore) => data.carType,
    },
    {
        label: 'Marca',
        column: 'branch',
        element: (data: IStore) => data.branch,
    },
    {
        label: 'Año Fabricacion',
        column: 'year',
        element: (data: IStore) => data.year.toString(),
    },
    {
        label: 'Numero de serie',
        column: 'series',
        element: (data: IStore) => data.series,
    },
    {
        label: 'Capacidad Carga',
        column: 'capacity',
        element: (data: IStore) => data.capacity.toString(),
    },
    {
        label: 'Dimensiones',
        column: 'dimensions',
        element: (data: IStore) => data.dimensions,
    },
    {
        label: 'Estado',
        column: 'status',
        element: (data: IStore) => data.status,
    },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
        canFilter: false
    },
];

export const data: IStore[] = [
    {
        carType: 'Modelo A',
        branch: 'Marca X',
        year: 2020,
        series: 'SN12345',
        capacity: 5000.0,
        dimensions: '5x2x3',
        status: 'Disponible',
    },
    {
        carType: 'Modelo B',
        branch: 'Marca Y',
        year: 2021,
        series: 'SN67890',
        capacity: 7000.0,
        dimensions: '6x3x4',
        status: 'En uso',
    },
    {
        carType: 'Modelo C',
        branch: 'Marca Z',
        year: 2019,
        series: 'SN11223',
        capacity: 8000.0,
        dimensions: '7x3x4',
        status: 'En reparación',
    },
    {
        carType: 'Modelo D',
        branch: 'Marca A',
        year: 2022,
        series: 'SN44556',
        capacity: 10000.0,
        dimensions: '8x4x5',
        status: 'Disponible',
    },
    {
        carType: 'Modelo E',
        branch: 'Marca B',
        year: 2021,
        series: 'SN78901',
        capacity: 6000.0,
        dimensions: '5x3x4',
        status: 'En uso',
    },
    {
        carType: 'Modelo F',
        branch: 'Marca C',
        year: 2020,
        series: 'SN23456',
        capacity: 4500.0,
        dimensions: '4x2x3',
        status: 'Disponible',
    },
    {
        carType: 'Modelo G',
        branch: 'Marca D',
        year: 2018,
        series: 'SN98765',
        capacity: 9000.0,
        dimensions: '7x3x5',
        status: 'En reparación',
    },
    {
        carType: 'Modelo H',
        branch: 'Marca E',
        year: 2023,
        series: 'SN65432',
        capacity: 12000.0,
        dimensions: '10x4x5',
        status: 'Disponible',
    },
    {
        carType: 'Modelo I',
        branch: 'Marca F',
        year: 2020,
        series: 'SN45678',
        capacity: 7000.0,
        dimensions: '6x3x4',
        status: 'En uso',
    },
    {
        carType: 'Modelo J',
        branch: 'Marca G',
        year: 2017,
        series: 'SN87654',
        capacity: 8000.0,
        dimensions: '7x3x4',
        status: 'En reparación',
    },
    {
        carType: 'Modelo K',
        branch: 'Marca H',
        year: 2021,
        series: 'SN34567',
        capacity: 6500.0,
        dimensions: '5x3x4',
        status: 'Disponible',
    },
    {
        carType: 'Modelo L',
        branch: 'Marca I',
        year: 2019,
        series: 'SN56789',
        capacity: 9000.0,
        dimensions: '8x4x5',
        status: 'En uso',
    },
    {
        carType: 'Modelo M',
        branch: 'Marca J',
        year: 2020,
        series: 'SN67891',
        capacity: 4000.0,
        dimensions: '4x2x3',
        status: 'Disponible',
    },
    {
        carType: 'Modelo N',
        branch: 'Marca K',
        year: 2022,
        series: 'SN78912',
        capacity: 11000.0,
        dimensions: '9x4x5',
        status: 'En reparación',
    },
    {
        carType: 'Modelo O',
        branch: 'Marca L',
        year: 2021,
        series: 'SN89123',
        capacity: 7500.0,
        dimensions: '6x3x4',
        status: 'En uso',
    },
    {
        carType: 'Modelo P',
        branch: 'Marca M',
        year: 2018,
        series: 'SN91234',
        capacity: 5000.0,
        dimensions: '5x2x3',
        status: 'Disponible',
    },
    {
        carType: 'Modelo Q',
        branch: 'Marca N',
        year: 2023,
        series: 'SN12345',
        capacity: 13000.0,
        dimensions: '12x5x6',
        status: 'Disponible',
    },
    {
        carType: 'Modelo R',
        branch: 'Marca O',
        year: 2020,
        series: 'SN23456',
        capacity: 6500.0,
        dimensions: '6x3x4',
        status: 'En uso',
    },
    {
        carType: 'Modelo S',
        branch: 'Marca P',
        year: 2021,
        series: 'SN34567',
        capacity: 9500.0,
        dimensions: '8x4x5',
        status: 'En reparación',
    },
    {
        carType: 'Modelo T',
        branch: 'Marca Q',
        year: 2020,
        series: 'SN45678',
        capacity: 7000.0,
        dimensions: '6x3x4',
        status: 'Disponible',
    },
];
