import error404 from '../assets/error-404.svg';

const PageNotFound = () => {
    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src={error404} alt="crash of cyclists" />
                    <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-600 mt-8">404</p>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 mt-2">Página no encontrada</p>
                    <p className="md:text-lg xl:text-xl text-gray-500 mt-4 text-center">¡OOPS! Has ido muy rápido, esta pagina aun no existe.</p>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;