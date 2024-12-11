import { Link } from "react-router-dom";
import TableComponent from "../../components/TableComponent";


export default function Equipment() {

    return (
        
        <>
        
            <div className="flex justify-between">

                <h2 className="text-4xl font-black">Módulo de Catálogo de Equipo</h2>

                <Link to={''} className="rounded-md p-3 text-sm text-white bg-red-900 font-bold shadow-sm hover:bg-red-800 mb-8">
                    Agregar
                </Link>

            </div>

            <div className="mb-5">

                <div className="relative">

                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-800 rounded-lg bg-gray-50" placeholder="Busca cualquier modelo" required />

                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">Buscar</button>

                </div>

            </div>
            
            <div className="p-2">

                <TableComponent />

            </div>

        
        </>

    );

}
