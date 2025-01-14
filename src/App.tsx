import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/Login";
import { Layout } from "./layouts/Layout";
import { Equipment } from "./pages/equipment/Equipment";
import { Rent } from "./pages/rent/Rent";
import { History } from "./pages/history/History";
import { Reports } from "./pages/reports/Reports";
import { Maintenance } from "./pages/maintenance/Maintenance";
import 'material-icons/iconfont/material-icons.css';
import { Clients } from "./pages/clients/Clients";
import { Workshop } from "./pages/workshop/Workshop";
import { Users } from "./pages/Users/Users";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
              {/* Login */}
              <Route element={<AuthLayout />}>
                <Route path='/auth/login' element={<LoginPage />} />
              </Route>

              <Route element={<Layout />}>
                <Route path='/equipos' element={<Equipment />} />
                <Route path='/clientes' element={<Clients />} />
                <Route path='/alquiler' element={<Rent />} />
                <Route path='/taller' element={<Workshop />} />
                <Route path='/historial' element={<History />} />
                <Route path='/reportes' element={<Reports />} />
                <Route path='/mantenimiento' element={<Maintenance />} />
                <Route path='/usuarios' element={<Users />} />
              </Route>

            </Routes>
        </BrowserRouter>
    );

}