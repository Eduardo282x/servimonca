import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import UsersLayout from "./layouts/UsersLayout";
import LoginPage from "./pages/auth/LoginPage";
import Equipment from "./pages/Users/Equipment";

export default function App() {

    return (

        <BrowserRouter>
        
            <Routes>

              {/* Login */}
              <Route element={<AuthLayout />}>

                <Route path='/auth/login' element={<LoginPage />} />

              </Route>

              {/* Users */}
              <Route element={<UsersLayout />}>

                <Route path='/equipos' element={<Equipment />} />

              </Route>

            </Routes>
        
        </BrowserRouter>

    );

}