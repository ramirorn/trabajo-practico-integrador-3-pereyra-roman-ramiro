export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Todos los derechos reservados.
            </p>
          </div>

          {/* Nombre del alumno */}
          <div className="text-center">
            <p className="text-sm font-semibold">
              Desarrollado por: Pereyra Roman, Ramiro Nicolas
            </p>
          </div>

          {/* Enlaces adicionales (opcional) */}
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-xs text-gray-400">
              Trabajo Práctico Integrador 3
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-700 my-6" />

        {/* Información adicional */}
        <div className="text-center">
          <p className="text-xs text-gray-400">TaskApp - Gestor de Tareas</p>
        </div>
      </div>
    </footer>
  );
};
