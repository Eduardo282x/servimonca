import { Link } from "react-router-dom";
import TableComponent from "../../components/TableComponent";


export default function Equipment() {

    return (
        
        <>
        
            <div className="flex justify-between">

                <h2 className="text-4xl font-black">Módulo de Catálogo de Equipo</h2>

                <Link to={''} className="rounded-md p-3 text-sm text-white bg-red-900 font-bold shadow-sm hover:bg-red-800 mb-8">
                    Agregar Catálogo
                </Link>

            </div>

            <div className="p-2">

                <TableComponent />

            </div>

        
        </>

    );

}
