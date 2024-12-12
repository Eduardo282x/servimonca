
export interface IStore {
    modelo: string;
    marca: string;
    anoFabricacion: number;
    numeroSerie: string;
    capacidadCarga: number;
    dimensiones: string;
    estadoActual: string;
}

export interface IColumns {
    label: string;
    column: string;
    element: (data: IStore) => string;
}

export const columnsStore: IColumns[] = [
    {
        label: 'Modelo',
        column: 'modelo',
        element: (data: IStore) => data.modelo,
    },
    {
        label: 'Marca',
        column: 'marca',
        element: (data: IStore) => data.marca,
    },
    {
        label: 'Año Fabricacion',
        column: 'anoFabricacion',
        element: (data: IStore) => data.anoFabricacion.toString(),
    },
    {
        label: 'Numero de serie',
        column: 'numeroSerie',
        element: (data: IStore) => data.numeroSerie,
    },
    {
        label: 'Capacidad Carga',
        column: 'capacidadCarga',
        element: (data: IStore) => data.capacidadCarga.toString(),
    },
    {
        label: 'Dimensiones',
        column: 'dimensiones',
        element: (data: IStore) => data.dimensiones,
    },
    {
        label: 'Estado',
        column: 'estadoActual',
        element: (data: IStore) => data.estadoActual,
    },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
    },
];

export const data: IStore[] = [
    {
        modelo: 'Modelo A',
        marca: 'Marca X',
        anoFabricacion: 2020,
        numeroSerie: 'SN12345',
        capacidadCarga: 5000.0,
        dimensiones: '5x2x3',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo B',
        marca: 'Marca Y',
        anoFabricacion: 2021,
        numeroSerie: 'SN67890',
        capacidadCarga: 7000.0,
        dimensiones: '6x3x4',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo C',
        marca: 'Marca Z',
        anoFabricacion: 2019,
        numeroSerie: 'SN11223',
        capacidadCarga: 8000.0,
        dimensiones: '7x3x4',
        estadoActual: 'En reparación',
    },
    {
        modelo: 'Modelo D',
        marca: 'Marca A',
        anoFabricacion: 2022,
        numeroSerie: 'SN44556',
        capacidadCarga: 10000.0,
        dimensiones: '8x4x5',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo E',
        marca: 'Marca B',
        anoFabricacion: 2021,
        numeroSerie: 'SN78901',
        capacidadCarga: 6000.0,
        dimensiones: '5x3x4',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo F',
        marca: 'Marca C',
        anoFabricacion: 2020,
        numeroSerie: 'SN23456',
        capacidadCarga: 4500.0,
        dimensiones: '4x2x3',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo G',
        marca: 'Marca D',
        anoFabricacion: 2018,
        numeroSerie: 'SN98765',
        capacidadCarga: 9000.0,
        dimensiones: '7x3x5',
        estadoActual: 'En reparación',
    },
    {
        modelo: 'Modelo H',
        marca: 'Marca E',
        anoFabricacion: 2023,
        numeroSerie: 'SN65432',
        capacidadCarga: 12000.0,
        dimensiones: '10x4x5',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo I',
        marca: 'Marca F',
        anoFabricacion: 2020,
        numeroSerie: 'SN45678',
        capacidadCarga: 7000.0,
        dimensiones: '6x3x4',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo J',
        marca: 'Marca G',
        anoFabricacion: 2017,
        numeroSerie: 'SN87654',
        capacidadCarga: 8000.0,
        dimensiones: '7x3x4',
        estadoActual: 'En reparación',
    },
    {
        modelo: 'Modelo K',
        marca: 'Marca H',
        anoFabricacion: 2021,
        numeroSerie: 'SN34567',
        capacidadCarga: 6500.0,
        dimensiones: '5x3x4',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo L',
        marca: 'Marca I',
        anoFabricacion: 2019,
        numeroSerie: 'SN56789',
        capacidadCarga: 9000.0,
        dimensiones: '8x4x5',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo M',
        marca: 'Marca J',
        anoFabricacion: 2020,
        numeroSerie: 'SN67891',
        capacidadCarga: 4000.0,
        dimensiones: '4x2x3',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo N',
        marca: 'Marca K',
        anoFabricacion: 2022,
        numeroSerie: 'SN78912',
        capacidadCarga: 11000.0,
        dimensiones: '9x4x5',
        estadoActual: 'En reparación',
    },
    {
        modelo: 'Modelo O',
        marca: 'Marca L',
        anoFabricacion: 2021,
        numeroSerie: 'SN89123',
        capacidadCarga: 7500.0,
        dimensiones: '6x3x4',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo P',
        marca: 'Marca M',
        anoFabricacion: 2018,
        numeroSerie: 'SN91234',
        capacidadCarga: 5000.0,
        dimensiones: '5x2x3',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo Q',
        marca: 'Marca N',
        anoFabricacion: 2023,
        numeroSerie: 'SN12345',
        capacidadCarga: 13000.0,
        dimensiones: '12x5x6',
        estadoActual: 'Disponible',
    },
    {
        modelo: 'Modelo R',
        marca: 'Marca O',
        anoFabricacion: 2020,
        numeroSerie: 'SN23456',
        capacidadCarga: 6500.0,
        dimensiones: '6x3x4',
        estadoActual: 'En uso',
    },
    {
        modelo: 'Modelo S',
        marca: 'Marca P',
        anoFabricacion: 2021,
        numeroSerie: 'SN34567',
        capacidadCarga: 9500.0,
        dimensiones: '8x4x5',
        estadoActual: 'En reparación',
    },
    {
        modelo: 'Modelo T',
        marca: 'Marca Q',
        anoFabricacion: 2020,
        numeroSerie: 'SN45678',
        capacidadCarga: 7000.0,
        dimensiones: '6x3x4',
        estadoActual: 'Disponible',
    },
];
