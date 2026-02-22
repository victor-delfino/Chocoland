import Logo from "./Logo";

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <nav>
          <ul className="flex gap-8">
            <li>
              <a
                href="#features"
                className="relative text-gray-600 font-medium hover:text-amber-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full"
              >
                Benefícios
              </a>
            </li>
            <li>
              <a
                href="#cta"
                className="relative text-gray-600 font-medium hover:text-amber-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full"
              >
                Oferta
              </a>
            </li>
            <li>
              <a
                href="#newsletter"
                className="relative text-gray-600 font-medium hover:text-amber-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full"
              >
                Newsletter
              </a>
            </li>
            <li>
              <a
                href="#footer"
                className="relative text-gray-600 font-medium hover:text-amber-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-700 after:transition-all hover:after:w-full"
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
