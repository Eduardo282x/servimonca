
export interface IClients {
    customerName: string;
    contactDetails: string;
    rif: string;
    address: string;
}

export interface IColumns {
    label: string;
    column: string;
    element: (data: IClients) => string;
}

export const columnsCustomer: IColumns[] = [
    {
        label: 'Nombre',
        column: 'customerName',
        element: (data: IClients) => data.customerName,
    },
    {
        label: 'Razón Social',
        column: 'rif',
        element: (data: IClients) => data.rif,
    },
    {
        label: 'Correo',
        column: 'contactDetails',
        element: (data: IClients) => data.contactDetails,
    },
    {
        label: 'Dirección',
        column: 'address',
        element: (data: IClients) => data.address.toString(),
    },
    {
        label: 'Editar',
        column: 'edit',
        element: () => 'edit',
    },
];

export const customers: IClients[] = [
    {
        customerName: 'Carlos Pérez',
        contactDetails: 'carlos.perez@gmail.com',
        rif: 'J -   8.678.493.453',
        address: 'Avenida Bolívar, 123, Maracaibo',
    },
    {
        customerName: 'María Gómez',
        contactDetails: 'maria.gomez@yahoo.com',
        rif: 'V -   12.365.895',
        address: 'Calle 10, Urb. La Trinidad, Caracas',
    },
    {
        customerName: 'José Rodríguez',
        contactDetails: 'jose.rodriguez@hotmail.com',
        rif: 'V -   20.395.695',
        address: 'Carrera 8, Sector El Centro, Valencia',
    },
    {
        customerName: 'Ana Fernández',
        contactDetails: 'ana.fernandez@outlook.com',
        rif: 'E -   2.465.705',
        address: 'Pasaje Los Olivos, Mérida',
    },
    {
        customerName: 'Luis Martínez',
        contactDetails: 'luis.martinez@gmail.com',
        rif: 'V -   6.968.483',
        address: 'Calle Libertador, 45, Barquisimeto',
    },
    {
        customerName: 'Clara Sánchez',
        contactDetails: 'clara.sanchez@hotmail.com',
        rif: 'J -   6.594.659',
        address: 'Urbanización Los Cedros, San Cristóbal',
    },
    {
        customerName: 'Pedro Morales',
        contactDetails: 'pedro.morales@yahoo.com',
        rif: '',
        address: 'Calle Principal, El Vigía',
    },
    {
        customerName: 'Isabel López',
        contactDetails: 'isabel.lopez@gmail.com',
        rif: '',
        address: 'Calle Sucre, 12, Ciudad Bolívar',
    },
    {
        customerName: 'Ramón Díaz',
        contactDetails: 'ramon.diaz@outlook.com',
        rif: '',
        address: 'Sector La Pastora, Puerto Ordaz',
    },
    {
        customerName: 'Sofía Torres',
        contactDetails: 'sofia.torres@hotmail.com',
        rif: '',
        address: 'Avenida Sucre, Maracay',
    },
    {
        customerName: 'Manuel Ruiz',
        contactDetails: 'manuel.ruiz@yahoo.com',
        rif: '',
        address: 'Calle Colón, Porlamar',
    },
    {
        customerName: 'Carolina Herrera',
        contactDetails: 'carolina.herrera@gmail.com',
        rif: '',
        address: 'Urbanización Los Jardines, Barinas',
    },
    {
        customerName: 'Javier Castro',
        contactDetails: 'javier.castro@hotmail.com',
        rif: '',
        address: 'Sector La Candelaria, Valencia',
    },
    {
        customerName: 'Lucía Vargas',
        contactDetails: 'lucia.vargas@outlook.com',
        rif: '',
        address: 'Calle Miranda, Mérida',
    },
    {
        customerName: 'Miguel Angel',
        contactDetails: 'miguel.angel@gmail.com',
        rif: '',
        address: 'Avenida Principal, Ciudad Guayana',
    },
];

