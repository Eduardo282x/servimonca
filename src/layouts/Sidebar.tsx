import React, { FC, useEffect, useState } from 'react';
import { ISidebarMenu, sidebarMenu } from './sidebar.data';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateUserLoged } from '../utils/auth';
import Logo from '../components/Logo';
import { UserData } from '../interfaces/user.interface';

interface ISidebarProps {
    open: boolean;
    setOpen: (close: boolean) => void;
}

export const Sidebar: FC<ISidebarProps> = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuSidebar, setMenuSidebar] = useState<ISidebarMenu[]>([]);


    useEffect(() => {

        const userData = validateUserLoged() as UserData;

        const filteredMenu = sidebarMenu.filter(menu =>
            menu.permissions.includes(userData.rol.rol)
        );

        const updatedMenu = filteredMenu.map(menu => ({
            ...menu,
            active: menu.redirectTo === location.pathname,
        }));

        setMenuSidebar(updatedMenu);
    }, [location.pathname]);

    const changeMenu = (opt: ISidebarMenu) => {

        const updatedMenu = menuSidebar.map(menu => ({
            ...menu,
            active: menu.label === opt.label,
        }));

        setMenuSidebar(updatedMenu);
        navigate(opt.redirectTo);
    };

    const logout = () => {
        navigate('/auth/login');
    };

    return (
        <div
            className={`h-full bg-gray-800 p-4 ${
                open ? 'w-80' : 'w-20'
            } transition-all flex flex-col items-start justify-between overflow-hidden`}
            onClick={() => setOpen(true)}
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center my-3">
                    <Logo
                        widthLogo={open ? 'w-20' : 'w-10'}
                        heightLogo={open ? 'w-20' : 'w-10'}
                    />
                </div>

                {menuSidebar.map((menu: ISidebarMenu, index: number) => (
                    <div
                        key={index}
                        onClick={() => changeMenu(menu)}
                        className={`flex items-center justify-between ${
                            open ? 'gap-2 w-60' : 'gap-10 w-14'
                        } px-4 py-2 rounded-md ${
                            menu.active && '!text-white bg-blue-400'
                        } text-gray-500 hover:text-white hover:bg-blue-400 transition-all cursor-pointer`}
                    >
                        <span className="material-icons">{menu.icon}</span>
                        {open && <span>{menu.label}</span>}
                    </div>
                ))}
            </div>

            <div
                onClick={logout}
                className={`flex items-center justify-between ${
                    open ? 'gap-2 w-60' : 'gap-10 w-14'
                } px-4 py-2 rounded-md text-gray-500 hover:text-white hover:bg-blue-400 transition-all cursor-pointer`}
            >
                <span className="material-icons-outlined">logout</span>
                {open && <span>Cerrar Sesión</span>}
            </div>
        </div>
    );
};
