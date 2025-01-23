import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
// import { Equipment } from "./pages/equipment/Equipment";
import { Rent } from "./pages/rent/Rent";
import { Reports } from "./pages/reports/Reports";
import { Maintenance } from "./pages/maintenance/Maintenance";
import { Clients } from "./pages/clients/Clients";
import { Users } from "./pages/Users/Users";
import 'material-icons/iconfont/material-icons.css';
// import { SparePart } from "./pages/sparePart/SparePart";
import { Profile } from "./pages/profile/Profile";
import { Request } from "./pages/request/Request";
import { Store } from "./pages/Store/Store";
import { MaintenanceClient } from "./pages/maintenance/Maintenance-client";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
              {/* Login */}
              <Route element={<AuthLayout />}>
                <Route path='/auth/login' element={<LoginPage />} />
              </Route>

              <Route element={<Layout />}>
                <Route path='/almacen' element={<Store />} />
                {/* <Route path='/equipos' element={<Equipment />} />
                <Route path='/repuestos' element={<SparePart />} /> */}
                <Route path='/alquiler' element={<Rent />} />
                <Route path='/clientes' element={<Clients />} />
                <Route path='/alquiler' element={<Rent />} />
                <Route path='/ordenes-compra' element={<Request />} />
                {/* <Route path='/solicitudes' element={<Request />} /> */}
                <Route path='/reportes' element={<Reports />} />
                <Route path='/mantenimiento' element={<Maintenance />} />
                <Route path='/mantenimiento-cliente' element={<MaintenanceClient />} />
                <Route path='/usuarios' element={<Users />} />
                <Route path='/perfil' element={<Profile />} />
              </Route>
              <Route path="*" element={<Navigate to="/auth/login" />} />

            </Routes>
        </BrowserRouter>
    );

}