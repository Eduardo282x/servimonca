import Logo from "./Logo";

export default function Header() {

    return (

        <header>

            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-950">

                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <div className="flex items-center">
                        
                        <Logo widthLogo="w-20" heightLogo="h-20" />

                    </div>

                    <div className="flex items-center lg:order-2">

                        <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Cerrar Sesión</button>
                        
                    </div>

                </div>
                
            </nav>

        </header>

    );

}
