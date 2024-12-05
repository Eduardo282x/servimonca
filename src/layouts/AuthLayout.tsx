import { Outlet } from "react-router-dom";

export default function AuthLayout() {

  return (

    <>
        
        <div className="bg-gray-800 min-h-screen">

            <div className="py-10 lg:py-20 mx-auto w-[450px]">

                

                <div>

                    <Outlet />

                </div>

            </div>

        </div>

    
    </>

  );

}









