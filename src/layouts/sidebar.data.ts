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
        label: 'Equipos',
        redirectTo: '/equipos',
        icon: 'front_loader',
        permissions: ['Administrador', 'Almacén'],
        active: false
    },
    {
        label: 'Repuestos',
        redirectTo: '/repuestos',
        icon: 'donut_small',
        permissions: ['Administrador', 'Taller'],
        active: false
    },
    {
        label: 'Taller',
        redirectTo: '/mantenimiento',
        icon: 'construction',
        permissions: ['Administrador', 'Personal Administrativo','Taller'],
        active: false
    },
    {
        label: 'Clientes',
        redirectTo: '/clientes',
        icon: 'groups',
        permissions: ['Administrador', 'Personal Administrativo'],
        active: false
    },
    {
        label: 'Reportes',
        redirectTo: '/reportes',
        icon: 'analytics',
        permissions: ['Administrador','Personal Administrativo',],
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