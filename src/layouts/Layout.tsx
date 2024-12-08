import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
// import { validateUserLoged } from '../utils/auth';

export const Layout = () => {
    // const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        // if (!validateUserLoged()) {
        //     navigate('/auth/login')
        // }
    }, []);

    return (
        <div className='w-screen h-screen overflow-hidden flex items-start justify-between'>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}></Sidebar>

            <div className="p-8 w-full" onClick={() => setSidebarOpen(false)}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
