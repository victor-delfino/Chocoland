function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-amber-800">
          🍫 ChocoLand
        </a>

        <nav>
          <ul className="flex gap-6">
            <li>
              <a
                href="#features"
                className="text-gray-600 hover:text-amber-700 transition-colors"
              >
                Benefícios
              </a>
            </li>
            <li>
              <a
                href="#cta"
                className="text-gray-600 hover:text-amber-700 transition-colors"
              >
                Oferta
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className="text-gray-600 hover:text-amber-700 transition-colors"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
