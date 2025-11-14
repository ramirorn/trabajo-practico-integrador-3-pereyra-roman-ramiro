export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const neonAccent = {
    color: "#fb923c", // naranja
    textShadow: `
      0 0 6px #c2410c,
      0 0 18px #fb923c,
      0 0 36px #f97316
    `,
  };

  return (
    <footer className="bg-gray-1000 text-gray-300 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <p className="text-sm" style={neonAccent}>&copy; {currentYear} Todos los derechos reservados.</p>
          </div>

          <div className="w-full md:w-1/3 text-center">
            <p className="text-sm font-semibold" style={neonAccent}>
              Desarrollado por: Pereyra Roman, Ramiro Nicolás
            </p>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right">
            <p className="text-xs text-gray-500" style={neonAccent}>Trabajo Práctico Integrador 3</p>
          </div>
        </div>

        <hr className="border-orange-800 my-6" />

        <div className="text-center">
          <p className="text-xs text-gray-500" style={neonAccent}>TaskApp - Gestor de Tareas</p>
        </div>
      </div>
    </footer>
  );
};