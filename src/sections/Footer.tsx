function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🍫 ChocoLand</h3>
            <p className="leading-relaxed">
              Chocolates artesanais feitos com amor e ingredientes premium. Do
              nosso ateliê direto para sua casa desde 2020.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2">
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
            <h3 className="text-xl font-bold text-white mb-4">Contato</h3>
            <ul className="space-y-2">
              <li>📧 contato@chocoland.com.br</li>
              <li>📱 (11) 99999-0000</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 ChocoLand. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
