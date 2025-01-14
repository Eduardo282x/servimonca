import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { validateUserLoged } from '../utils/auth';
import { UserData } from '../interfaces/user.interface';

export const Layout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserData>({} as UserData);

    useEffect(() => {
        if (!validateUserLoged()) {
            navigate('/auth/login')
        }
        setUserInfo(validateUserLoged() as UserData)
    }, []);

    return (
        <div className='w-screen h-screen overflow-hidden flex items-start justify-between'>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}></Sidebar>

            <div className="w-full">
                <div className="w-full py-2 px-8 text-lg text-white flex items-center justify-end gap-2 bg-gray-800">
                    <p>Bienvenido {userInfo.firstName} {userInfo.lastName}</p>
                    <span className='material-icons'>account_circle</span>
                </div>

                <div className="p-8 w-full overflow-auto h-[95vh]" onClick={() => setSidebarOpen(false)}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
