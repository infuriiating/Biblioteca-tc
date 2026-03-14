const Footer = () => {
  return (
    <footer className="bg-[#0d1111] text-text-muted py-12 mt-16 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src="src/assets/logotipo.png" alt="Logotipo" className="h-20" />
              <div>
                <h4 className="text-xl font-bold text-text-main line-height-tight">Agrupamento de Escolas</h4>
                <p className="text-text-muted">Tomás Cabreira</p>
              </div>
            </div>
            <p className="max-w-md opacity-60">
              Dedicados à excelência educativa e à promoção da cultura através do acesso livre à informação e ao conhecimento literário.
            </p>
          </div>

          {/* Contacts */}
          <div>
            <h5 className="text-lg font-bold text-text-main mb-6">Contactos</h5>
            <ul className="space-y-4 opacity-70">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">📞</span>
                <span>289 889 570</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">📧</span>
                <div>
                  <a href="mailto:secretaria@agr-tc.pt" className="block hover:text-primary transition-colors">secretaria@agr-tc.pt</a>
                  <a href="mailto:direcao@agr-tc.pt" className="block hover:text-primary transition-colors">direcao@agr-tc.pt</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">📍</span>
                <span>R. Dr. Manuel Arriaga 2,<br />8000-151 Faro</span>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h5 className="text-lg font-bold text-text-main mb-6">Links Úteis</h5>
            <div className="space-y-3 opacity-70">
              <a href="https://sdurao.com/tc/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> Plataforma Sdurão
              </a>
              <a href="https://www.moodle25.agr-tc.pt/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> Moodle Agrupamento
              </a>
              <a href="https://agr-tc.pt/wp/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="text-primary">→</span> Website Oficial
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center">
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} Agrupamento de Escolas Tomás Cabreira. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
