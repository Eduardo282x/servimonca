export interface ISidebarMenu {
    label: string;
    redirectTo: string;
    icon: string;
    permissions: Roles[];
    active: boolean;
}

// ALMACEN ALQUILER MANTENIMIENTO HISTORIAL Clientes
export type Roles = 'Administrador' | 'Personal Administrativo' | 'Almacén' | 'Taller'


export const sidebarMenu: ISidebarMenu[] = [
    {
        label: 'Almacén',
        redirectTo: '/almacen',
        icon: 'domain',
        permissions: ['Administrador', 'Almacén'],
        active: false
    },
    {
        label: 'Taller',
        redirectTo: '/mantenimiento',
        icon: 'construction',
        permissions: ['Administrador','Taller'],
        active: false
    },
    {
        label: 'Ordenes de compra',
        redirectTo: '/ordenes-compra',
        icon: 'list_alt',
        permissions: ['Administrador', 'Personal Administrativo'],
        active: false
    },
    {
        label: 'Reportes',
        redirectTo: '/reportes',
        icon: 'analytics',
        permissions: ['Administrador','Personal Administrativo'],
        active: false
    },
    {
        label: 'Servicios',
        redirectTo: '/servicios',
        icon: 'support_agent',
        permissions: ['Administrador', 'Personal Administrativo'],
        active: false
    },
    {
        label: 'Métodos de pago',
        redirectTo: '/metodos-pago',
        icon: 'payments',
        permissions: ['Administrador'],
        active: false
    },
    {
        label: 'Usuarios',
        redirectTo: '/usuarios',
        icon: 'group',
        permissions: ['Administrador'],
        active: false
    },
    {
        label: 'Perfil',
        redirectTo: '/perfil',
        icon: 'person',
        permissions: ['Administrador', 'Personal Administrativo','Almacén','Taller'],
        active: false
    }
]