import Logo from "../components/Logo";

function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-gray-300 pt-20 pb-8 px-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-4 [&_span]:text-white [&_svg_rect]:fill-amber-400 [&_svg_line]:stroke-amber-600">
              <Logo />
            </div>
            <p className="leading-relaxed">
              Chocolates artesanais feitos com amor e ingredientes premium. Do
              nosso ateliê direto para sua casa desde 2020.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-5 uppercase tracking-wider">
              Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="hover:text-amber-400 transition-colors"
                >
                  Benefícios
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  className="hover:text-amber-400 transition-colors"
                >
                  Oferta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-5 uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                📧 contato@chocoland.com.br
              </li>
              <li className="flex items-center gap-2">📱 (11) 99999-0000</li>
              <li className="flex items-center gap-2">📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 ChocoLand. Todos os direitos reservados.</p>
          <p>Feito com ❤️ e muito chocolate</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
