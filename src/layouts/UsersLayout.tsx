import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function UsersLayout() {

  return (

    <>

      <div className="bg-gray-300">

        <Header />

        <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">

          <Outlet />

        </main>


      </div>

    
    </>

  );

}









