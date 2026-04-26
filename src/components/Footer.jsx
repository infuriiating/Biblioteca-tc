import logotipo from '../assets/logotipo.png'
import SlideIn from './ui/motion/SlideIn'
import FadeIn from './ui/motion/FadeIn'

const Footer = () => {
  return (
    <footer className="w-full bg-transparent border-t border-border/50 mt-auto pt-12 pb-28 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Logo & About */}
          <SlideIn direction="up" delay={0.1} className="flex items-center">
            <div className="flex items-center gap-4">
              <img src={logotipo} alt="Logotipo Agrupamento" className="h-16" />
              <div>
                <h4 className="text-lg font-bold text-text-main leading-tight">Agrupamento de Escolas</h4>
                <p className="text-text-muted text-sm font-medium">Tomás Cabreira</p>
              </div>
            </div>
          </SlideIn>

          {/* Contacts */}
          <SlideIn direction="up" delay={0.2}>
            <div>
              <h5 className="text-xs font-bold text-text-main mb-6 uppercase tracking-widest opacity-80">Contactos</h5>
              <ul className="space-y-4 opacity-80 font-medium text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📞</span>
                  <span>289 889 570</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📧</span>
                  <div className="space-y-2">
                    <a href="mailto:secretaria@agr-tc.pt" className="block hover:text-primary transition-colors">secretaria@agr-tc.pt</a>
                    <a href="mailto:direcao.agrupamento@agr-tc.pt" className="block hover:text-primary transition-colors">direcao.agrupamento@agr-tc.pt</a>
                  </div>
                </li>
              </ul>
            </div>
          </SlideIn>

          {/* Useful Links */}
          <SlideIn direction="up" delay={0.3}>
            <div>
              <h5 className="text-xs font-bold text-text-main mb-6 uppercase tracking-widest opacity-80">Links Úteis</h5>
              <div className="space-y-4 opacity-80 font-medium text-sm">
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
          </SlideIn>
        </div>

        <FadeIn delay={0.4} className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm font-medium opacity-60">
            &copy; {new Date().getFullYear()} Agrupamento de Escolas Tomás Cabreira, em Faro. Todos os direitos reservados.
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}

export default Footer
