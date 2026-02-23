import Logo from "./Logo";

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <nav>
          <ul className="flex gap-8">
            <li>
              <a href="#features" className="nav-link">
                Benefícios
              </a>
            </li>
            <li>
              <a href="#cta" className="nav-link">
                Oferta
              </a>
            </li>
            <li>
              <a href="#newsletter" className="nav-link">
                Newsletter
              </a>
            </li>
            <li>
              <a href="#footer" className="nav-link">
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
